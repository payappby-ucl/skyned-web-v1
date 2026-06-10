type PaymentWidgetConfig = {
  universityId: string;
  globalDefault: { domain: string; name?: string };
  regions?: Array<{ countries: string[]; store: { domain: string; name?: string } }>;
  styles?: { primaryColor?: string; borderRadius?: string };
  iframe?: { maxWidth?: string; loadingText?: string };
  analytics?: { enabled?: boolean; debug?: boolean };
  floatingButton?: { text?: string; position?: string; backgroundColor?: string };
  useIframe?: boolean;
};

interface PaymentWidgetFunction {
  (command: 'init', config: PaymentWidgetConfig): void;
  (command: 'embed', selector: string, options?: { height?: string; country?: string }): void;
  (command: 'open', path: string): void;
  (command: 'getAnalytics'): { summary: { totalClicks: number } };
  q?: unknown[];
}

declare global {
  interface Window {
    paymentWidget: PaymentWidgetFunction;
    PaymentWidget: string;
  }
}

export {};
