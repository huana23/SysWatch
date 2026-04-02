import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PartnerRegionMap, RegionItem } from "@/types/partners";

const FALLBACK_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.092162915178!2d108.2157016802403!3d16.060706544954964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219cc7ae509fb%3A0x5c106ac33f9ce216!2zNTUgTmd1eeG7hW4gVsSDbiBMaW5oLCBQaMaw4bubYyBOaW5oLCBI4bqjaSBDaMOidSwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1775143432546!5m2!1svi!2s";

type PartnerRegionCardProps = {
  title: string;
  regionData: RegionItem[];
  regionMap: PartnerRegionMap;
};

export default function PartnerRegionCard({
  title,
  regionData,
  regionMap,
}: PartnerRegionCardProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const dynamicMapSrc = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
        regionMap.address,
      )}&center=${regionMap.latitude},${regionMap.longitude}&zoom=${regionMap.zoom}`
    : null;

  const finalMapSrc = dynamicMapSrc ?? FALLBACK_MAP_EMBED_URL;

  return (
    <Card className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-card shadow-sm">
      <CardHeader className="border-b px-5 py-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col space-y-5 p-5">
        <div className="space-y-5">
          {regionData.map((item) => (
            <div key={item.name}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-foreground">{item.name}</span>
                <span className="font-semibold text-muted-foreground">
                  {item.value}%
                </span>
              </div>

              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-sky-500"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto overflow-hidden rounded-2xl border border-border">
          <iframe
            src={finalMapSrc}
            width="100%"
            height="320"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full"
            title="Bản đồ khu vực đối tác"
          />
        </div>
      </CardContent>
    </Card>
  );
}