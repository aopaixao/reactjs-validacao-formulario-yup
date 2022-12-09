import React, {useState} from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Container, Form, Button } from "react-bootstrap";

import './App.css';


function App() {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [select, setSelect] = useState();

  const schema = Yup.object({
    nome: Yup.string().required("O nome precisa ser preenchido"),
    email: Yup.string().email().required("O email precisa ser preenchido"),
    password: Yup.string().min(4).max(15).required("A senha precisa ser preenchida e ter entre 4 e 15 caracteres"),  
    select: Yup.mixed()
      .required("Uma opção precisa ser selecionada")
      .oneOf(["Opção 1", "Opção 2"])
      .label("Selecione uma Opção"),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const submitFormulario = () => {
    console.log(`Nome: ${nome} - Email: ${email} - Password: ${password} - Select: ${select}`);
  }

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit(submitFormulario)}>
        <Form.Group className="mb-3" controlId="formBasicNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" name='nome' placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
          <p className="msg_alert">
            {errors.nome?.message}
          </p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <p className="msg_alert">
            {errors.email?.message}
          </p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <p className="msg_alert">
            {errors.password?.message}
          </p>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Opções</Form.Label>
          <Form.Select name='select' onChange={(e) => setSelect(e.target.value)} >
            <option key={0} value={''}>Selecione</option>
            <option key={1} value={'Opção 1'}>Opção 1</option>
            <option key={2} value={'Opção 2'}>Opção 2</option>
          </Form.Select>
          <p className="msg_alert">
            {errors.select?.message}
          </p>
        </Form.Group>
        <Button variant="primary" type='submit'>
          Enviar
        </Button>
      </Form>
    </Container>
  );
}

export default App;