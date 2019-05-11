import React, { Component } from 'react';

import { useAlert } from "react-alert";

import './styles.css';

const Caixa = () => {

    const alert = useAlert();

    const [state, setState] = React.useState({
        troco: 0,
        itens: [],
        total: 0,
        pagamento: 0,
        produtos: [
            { nome: 'Espetinho', valor: 3.50, cor: 'rgb(154, 246, 0)' },
            { nome: 'Yakissoba', valor: 15.00, cor: 'rgb(246, 0, 68)' },
            { nome: 'Refrigerante', valor: 3.50, cor: 'rgb(0, 167, 246)' },
            { nome: 'Espetinho', valor: 3.50, cor: 'rgb(154, 246, 0)' },
            { nome: 'Yakissoba', valor: 15.00, cor: 'rgb(246, 0, 68)' },
            { nome: 'Refrigerante', valor: 3.50, cor: 'rgb(0, 167, 246)' },
            { nome: 'Espetinho', valor: 3.50, cor: 'rgb(154, 246, 0)' },
            { nome: 'Yakissoba', valor: 15.00, cor: 'rgb(246, 0, 68)' },
            { nome: 'Refrigerante', valor: 3.50, cor: 'rgb(0, 167, 246)' }
        ]
    });

    const adicionaProduto = (produto) => {
        const itens = state.itens;

        let indexProdutoAdicionado = itens.findIndex(produtoAtual => produtoAtual.nome === produto.nome);
        let produtoAdicionado;
        let total = state.total + produto.valor;

        if (indexProdutoAdicionado !== -1) {
            produtoAdicionado = itens[indexProdutoAdicionado];
            produtoAdicionado.quantidade++;
            itens.splice(indexProdutoAdicionado, 1, produtoAdicionado);
        } else {
            produtoAdicionado = { ...produto, quantidade: 1 };
            itens.push(produtoAdicionado);
        }
        const produtos = state.produtos;
        setState({ ...state, produtos, total, itens });
    }

    const formataValor = (valor) => {
        const format = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
        return valor.toLocaleString('pt-BR', format);
    }

    const calculaTroco = () => {
        let troco = state.pagamento - state.total;

        if (troco < 0) {
            alert.error("O Valor do pagamento deve ser maior que o valor total do pedido");
            return;
        }
        setState({ ...state, troco });
    }

    const handleChange = (e) => {
        setState({ ...state, pagamento: e.target.value });
    }

    const limparTela = () => {
        setState({ ...state, troco: 0, itens: [], total: 0, pagamento: 0 });
    }

    return (
        <div id="caixa-container">
            <section>
                {state.produtos.map((produto, index) => (
                    <div className="ficha" onClick={() => adicionaProduto(produto)} key={index} style={{ backgroundColor: produto.cor }}>
                        <div>
                            {produto.nome}
                        </div>
                        <div>
                            {formataValor(produto.valor)}
                        </div>
                    </div>
                ))}
            </section>

            <div id="container-pagamento">
                <div>
                    <input value={state.pagamento} onChange={handleChange.bind(this)} placeholder="Valor pagamento"></input>
                    <button className="btn-troco" onClick={() => calculaTroco()}>Calcular Troco</button>
                    <button className="btn-limpar" onClick={() => limparTela()}>Limpar tela</button>
                </div>
                <h3>Troco: {formataValor(state.troco)}</h3>
            </div>

            <div className="pedido">
                <h3>Pedido atual</h3>
                <ul>
                    {state.itens.map((item, index) => (
                        <li key={index}>{`${item.nome} (${item.quantidade})`}</li>
                    ))}
                </ul>

                <h4>{`Total: ${formataValor(state.total)}`}</h4>

            </div>
        </div>
    );

}

export default Caixa;