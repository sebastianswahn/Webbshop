import { Link } from "react-router-dom";
import { Card } from "../../components/Card";
import { LoginForm } from "../../components/LoginForm";

function Login() {
  return (
    <div>
      <Card>
        <LoginForm />
        <p className="mt-3">
          Not a member?{" "}
          <Link className="text-blue-600 underline" to="/auth/register">
            Create an account here!
          </Link>
        </p>
      </Card>
    </div>
  );
}
export default Login;
