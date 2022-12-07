
module.exports = class GeneratorController {
    static async generate(req, res) {

        const { checkedMaiuscula, checkedMinuscula, checkedNumeros, checkedSimbolos, num } = req.body;
        const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const minusculas = "abcdefgijklmnopqrstuvwxyz";
        const numeros = "0123456789";
        const simbolos = "!@#$%&*()-=*+/><|{}[]¨_§";
        let str = "";
        let senha = "";

        if (!checkedMaiuscula && !checkedMinuscula && !checkedNumeros && !checkedSimbolos) {
            res.status(422).json({ message: "Selecione ao menos uma opção de senha!" });
        } else {

            if (checkedMaiuscula)
                str = str + maiusculas;

            if (checkedMinuscula)
                str = str + minusculas;

            if (checkedNumeros)
                str = str + numeros;

            if (checkedSimbolos)
                str = str + simbolos;

            for (let i = 0; i < num; i++) {
                senha += str.charAt(Math.floor(Math.random() * str.length));
            }

            res.status(200).json({ senha: senha, });
        }

    }
}