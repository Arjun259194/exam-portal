'use server'
import LogoutButton from "@/components/Auth/LogoutButton";

function page() {
  return (
    <div>
      <h1>this is the user page</h1>
      <p>this page is protected with authentication</p>
      <p>only authorized user can access this page</p>
      <LogoutButton variant="primary" />
    </div>
  );
}

export default page;
