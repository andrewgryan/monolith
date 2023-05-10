import { z } from "zod";

// Use Zod to define image type
type Images = z.infer<typeof Images>;
const Images = z.object({
  images: z.array(
    z.object({
      src: z.string(),
      activate: z.boolean().default(false),
    })
  ),
});

// Do traditional fetch
async function fetchImage(url: string) {
  return fetch(url).then(async (response) => {
    if (!response.ok) {
      throw new Error("Woops");
    }
    return response.json().then(Images.safeParse);
  });
}

fetchImage("meta.json").then((result) => {
  if (!result.success) {
    // BAD
    console.log(result.error.format());
  } else {
    // GOOD
    const images: Images = result.data;
    images.images.filter((img) => img.activate).map((img) => console.log(img));
  }
});
