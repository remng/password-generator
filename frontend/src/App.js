import './App.css';
import { useState } from 'react';
import api from './utils/api';
import copy from 'copy-to-clipboard';
import { AiOutlineCopy } from 'react-icons/ai';
import Message from './components/Message';

//hooks
import useFlashMessage from './hooks/useFlashMessage';

function App() {
  const { setFlashMessage } = useFlashMessage();
  const [num, setNum] = useState(20);
  const [checkedNumeros, setCheckedNumeros] = useState(true);
  const [checkedMaiuscula, setCheckedMaiuscula] = useState(true);
  const [checkedMinuscula, setCheckedMinuscula] = useState(true);
  const [checkedSimbolos, setCheckedSimbolos] = useState(true);
  const [senha, setSenha] = useState("");

  function changeRange(e) {
    setNum(e.target.value);
  }

  function changeNumeros(e) {
    setCheckedNumeros(e.target.checked);
  }

  function changeMaiuscula(e) {
    setCheckedMaiuscula(e.target.checked);
  }

  function changeMinuscula(e) {
    setCheckedMinuscula(e.target.checked);
  }

  function changeSimbolos(e) {
    setCheckedSimbolos(e.target.checked);
  }

  function copiarSenha() {
    copy(senha);
    setFlashMessage("Senha copiada!", "success");
  }

  async function submit(e) {
    e.preventDefault();

    const data = await api.post('/generate', { checkedMaiuscula, checkedMinuscula, checkedNumeros, checkedSimbolos, num },)
      .then((response) => {
        setSenha(response.data.senha);
        return response.data;

      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
        return (err);
      });
  }


  return (
    <>
      <Message />
      <form onSubmit={submit}>
        <h1>Gerador de Senhas</h1>
        <div className='container'>

          <div className="container-2">
            <Checkbox label="Números" checked={checkedNumeros} onChange={changeNumeros} />
            <Checkbox label="Maiúscula" checked={checkedMaiuscula} onChange={changeMaiuscula} />
            <Checkbox label="Minúscula" checked={checkedMinuscula} onChange={changeMinuscula} />
            <Checkbox label="Símbolos" checked={checkedSimbolos} onChange={changeSimbolos} />
          </div>

          <div className="container-2">
            <h2>Tamanho da senha</h2>
            <input disabled type="text" value={num} />
            <input type="range" min="6" max="50" step="1" value={num} onChange={changeRange} />
            <input type="submit" value="Gerar Senha" />
          </div>

        </div>
      </form>

      <div className="container-senha">
        <input type="text" readOnly value={senha} />
        <AiOutlineCopy onClick={copiarSenha} />
      </div>
    </>
  );
}

const Checkbox = ({ label, onChange, checked }) => {
  return (
    <label className="container-label">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
      <span className="checkmark"></span>
    </label>
  );
};

export default App;
