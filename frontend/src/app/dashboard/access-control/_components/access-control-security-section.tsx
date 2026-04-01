"use client";

import { useState } from "react";

import Image from "next/image";

import securityClockIcon from "@/assets/images/security-clock.svg";
import securityKeyIcon from "@/assets/images/security-key.svg";
import securitySmartPhoneIcon from "@/assets/images/security-smart-phone.svg";
import { Switch } from "@/components/ui/switch";

const securitySettings = [
  {
    id: "two-factor",
    title: "Xác thực 2 yếu tố (2FA)",
    description: "Bắt buộc cho Admin & OPT",
    iconSrc: securitySmartPhoneIcon,
    defaultChecked: true,
  },
  {
    id: "sso",
    title: "Single Sign-On (SSO)",
    description: "Đăng nhập qua Google/Azure",
    iconSrc: securityKeyIcon,
    defaultChecked: false,
  },
  {
    id: "session-timeout",
    title: "Hết hạn phiên làm việc",
    description: "Tự động đăng xuất sau 30p",
    iconSrc: securityClockIcon,
    defaultChecked: true,
  },
] as const;

const AccessControlSecuritySection = () => {
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(securitySettings.map((s) => [s.id, s.defaultChecked])),
  );

  return (
    <section className="space-y-4">
      <h2 className="font-bold text-heading-lg text-lg">Thiết lập bảo mật</h2>

      <div className="space-y-4">
        {securitySettings.map((setting) => {
          return (
            <div
              key={setting.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div className="flex gap-3">
                <Image
                  src={setting.iconSrc}
                  alt={setting.title}
                  width={32}
                  height={32}
                  className="size-8 object-contain"
                  unoptimized
                />
                <div>
                  <p className="font-bold text-sm text-heading-lg leading-6">
                    {setting.title}
                  </p>
                  <p className="text-xs text-heading-md leading-6">
                    {setting.description}
                  </p>
                </div>
              </div>

              <Switch
                checked={Boolean(state[setting.id])}
                onCheckedChange={(checked) => {
                  setState((prev) => ({ ...prev, [setting.id]: checked }));
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AccessControlSecuritySection;
