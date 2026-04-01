import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  title: string;
  description: string;
};

const AccessControlPageHeader = ({ title, description }: Props) => {
  return (
    <Card className="rounded-none border-0 bg-transparent p-0 shadow-none ring-0">
      <CardHeader className="gap-1 p-0">
        <CardTitle className="font-black text-2xl text-heading-lg tracking-tight md:text-3xl">
          {title}
        </CardTitle>
        <CardDescription className="text-base text-heading-md">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AccessControlPageHeader;
