import { useParams } from "@solidjs/router";

export function Post() {
  const params = useParams();
  return <div>Post: {params.id}</div>;
}

export default function Blog() {
  return <div>Blog</div>;
}
