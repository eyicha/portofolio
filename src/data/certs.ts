export type Cert = { title: string; issuer: string; year: string; image: string; file?: string; fileType?: "image" | "pdf" };

export const certs: Cert[] = [1, 2, 3, 4].map((n) => ({
  title: `TODO Certificate ${n}`,
  issuer: "TODO Issuer",
  year: "TODO",
  image: `/images/certs/${n}.png`,
}));
