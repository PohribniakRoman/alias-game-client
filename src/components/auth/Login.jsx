import { Form } from "react-bootstrap";

export default function Login(){
    return(
        <Form>
            <Form.Control className="mb-3" placeholder="login"/>
            <Form.Control placeholder="Password" type="Password"/>
        </Form>
    )
}