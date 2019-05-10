import React, { Component } from 'react';

import './styles.css';

export default class caixa extends Component {

    state = {
        itens: [],
        total: 0,
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
    }

    adicionaProduto = (produto) => {
        const itens = this.state.itens;

        let indexProdutoAdicionado = itens.findIndex(produtoAtual => produtoAtual.nome === produto.nome);
        let produtoAdicionado;
        let total = this.state.total + produto.valor;

        if (indexProdutoAdicionado !== -1) {
            produtoAdicionado = itens[indexProdutoAdicionado];
            produtoAdicionado.quantidade++;
            itens.splice(indexProdutoAdicionado, 1, produtoAdicionado);
        } else {
            produtoAdicionado = { ...produto, quantidade: 1 };
            itens.push(produtoAdicionado);
        }
        const produtos = this.state.produtos;
        this.setState({ produtos, total, itens });
        console.log(this.state);
    }

    render() {
        return (
            <div id="caixa-container">
                <section>
                    {this.state.produtos.map((produto, index) => (
                        <div onClick={() => this.adicionaProduto(produto)} key={index} style={{ backgroundColor: produto.cor }}>
                            {`${produto.nome} R$ ${produto.valor}`}
                        </div>
                    ))}
                </section>

                <div id="container-pagamento">
                    <div>
                        <input placeholder="Valor pagamento"></input>
                        <button>Calcular Troco</button>
                    </div>
                    <h3>Troco: R$15,57</h3>
                </div>

                <div className="pedido">
                    <h3>Pedido atual</h3>
                    <ul>
                        {this.state.itens.map((item, index) => (
                            <li key={index}>{`${item.nome} (${item.quantidade})`}</li>
                        ))}
                    </ul>

                    <h4>{`Total: R$${this.state.total}`}</h4>

                </div>
            </div>
        );
    }
}
