import Script from "next/script";
import { ANALYTICS } from "@/lib/config";

export function AnalyticsScript() {
  const hasGtag = Boolean(ANALYTICS.gtag);
  const hasUmami = Boolean(ANALYTICS.umami);

  if (!hasGtag && !hasUmami) {
    return null;
  }

  return (
    <>
      {hasGtag && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.gtag}`}
          />
          <Script id="gtag-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ANALYTICS.gtag}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
      {hasUmami && (
        <Script
          id="umami"
          async
          defer
          data-website-id={ANALYTICS.umami}
          src="https://analytics.umami.is/script.js"
        />
      )}
    </>
  );
}
