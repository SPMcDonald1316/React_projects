import { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import Body from "../components/Body";
import InputField from "../components/InputField";
import { useApi } from "../contexts/ApiProvider";
import { useFlash } from "../contexts/FlashProvider";

function ResetRequestPage() {
  const [formErrors, setFormErrors] = useState({})
  const emailField = useRef();
  const api = useApi();
  const flash = useFlash();

  useEffect(() => {
    emailField.current.focus();
  }, []);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const response = await api.post('/tokens/reset', {
      email: emailField.current.value,
    });
    if (!response.ok) {
      setFormErrors(response.body.errors.json);
    } else {
      emailField.current.value = '';
      setFormErrors({});
      flash('You will receive an email with instructions to reset your password.', 'info');
    }
  };

  return (
    <Body>
      <h1>Reset Your Password</h1>
      <Form onSubmit={onSubmit}>
        <InputField 
          name="email" label="Email Address"
          error={formErrors.email}
          fieldRef={emailField}
        />
        <Button variant="primary" type="submit">Reset Password</Button>
      </Form>
    </Body>
  );
}

export default ResetRequestPage