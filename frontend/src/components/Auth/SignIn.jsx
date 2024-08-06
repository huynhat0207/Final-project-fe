import Form from "./Form";
function SignIn() {
    return <Form route="/api/user/token/" method="login" />
}
export default SignIn;