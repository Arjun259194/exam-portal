import Button from "@/components/UI/Button";
import IconButton from "@/components/UI/IconButton";
import { Smile } from "lucide-react";

export default function Home() {
  return (
    <>
    <IconButton variant="primary"  Icon={Smile}>Smile</IconButton>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, laboriosam! Dolorum similique, sunt quibusdam impedit beatae illo hic, commodi voluptate et, cumque dicta deleniti architecto dolores consequuntur asperiores facere nam!</p>
    <Button variant="primary">SOmeting</Button>
    </>
  );
}
