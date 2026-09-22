export const DRIVE_CATALOG = {
  fileId: "10VX-IF9mPPkYdntP8VsTwl0FkFQbzIFozHAdBut4XbU",
  name: "CivicAid Benefits",
  webViewLink:
    "https://docs.google.com/spreadsheets/d/10VX-IF9mPPkYdntP8VsTwl0FkFQbzIFozHAdBut4XbU/edit",
} as const;

/** How often the app checks Drive for a newer sheet. */
export const CATALOG_POLL_MS = 8_000;
