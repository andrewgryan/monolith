const url_strawberry = "https://source.unsplash.com/imTYg9Kt6s0";
const url_marmalade = "https://source.unsplash.com/0ZGzu8J69kY";

export default function NewRecipe() {
  return (
    <div class="h-screen grid grid-cols-2 bg-green-100 overflow-hidden">
      <picture class="max-h-full max-w-full">
        <source media="(min-width:400px)" srcset={url_marmalade} />
        <img class="object-cover object-center" src={url_strawberry} />
      </picture>
      <div class="text-5xl font-extrabold">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Hello world
        </span>
      </div>
    </div>
  );
}
