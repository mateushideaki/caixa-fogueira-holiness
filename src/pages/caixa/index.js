import React from 'react';

import { useAlert } from "react-alert";
import { MdCancel, MdRemoveCircle } from "react-icons/md";

import './styles.css';

const Caixa = () => {

    const alert = useAlert();

    const [state, setState] = React.useState({
        troco: 0,
        itens: [],
        total: 0,
        pagamento: 0,
        produtos: [
            { nome: 'Onigiri', valor: 1.00, cor: 'rgb(154, 246, 0)' },
            { nome: 'Espetinho', valor: 3.50, cor: 'rgb(246, 0, 68)' },
            { nome: 'Yakissoba', valor: 15.00, cor: 'rgb(246, 227, 0)' },
            { nome: 'Água', valor: 2.50, cor: 'rgb(0, 167, 246)' },
            { nome: 'Refrigerante', valor: 3.50, cor: 'rgb(157, 0, 255)' },
            { nome: 'Doce', valor: 2.50, cor: 'rgb(255, 85, 179)' },
            { nome: 'Udon', valor: 18.00, cor: 'rgb(255, 162, 22)' },
            { nome: 'Pescaria', valor: 10.00, cor: 'rgb(220, 0, 246)' },
        ]
    });

    const adicionaNota = (valor) => {
        let pagamento = Number(valor) + (Number(state.pagamento) || 0);
        pagamento = parseFloat(pagamento).toFixed(2);
        setState({ ...state, pagamento });
    }

    const adicionaProduto = (produto, event, quantidade = 1) => {
        event.stopPropagation();
        const itens = state.itens;

        let indexProdutoAdicionado = itens.findIndex(produtoAtual => produtoAtual.nome === produto.nome);
        let produtoAdicionado;
        let total = state.total + (produto.valor * quantidade);

        if (indexProdutoAdicionado !== -1) {
            produtoAdicionado = itens[indexProdutoAdicionado];
            produtoAdicionado.quantidade += quantidade;
            itens.splice(indexProdutoAdicionado, 1, produtoAdicionado);
        } else {
            produtoAdicionado = { ...produto, quantidade };
            itens.push(produtoAdicionado);
        }
        setState({ ...state, total, itens });
    }

    const diminuiProduto = (produto) => {
        const itens = state.itens;

        let indexProduto = itens.findIndex(produtoAtual => produtoAtual.nome === produto.nome);

        if (indexProduto !== -1) {
            const produtoAtual = itens[indexProduto];
            produtoAtual.quantidade--;

            if (produtoAtual.quantidade > 0) {
                itens.splice(indexProduto, 1, produtoAtual);
            } else {
                itens.splice(indexProduto, 1);
            }

            const total = state.total - produto.valor;
            setState({ ...state, total, itens });
        }
    }

    const removeProduto = (produto) => {
        const itens = state.itens;

        let indexProduto = itens.findIndex(produtoAtual => produtoAtual.nome === produto.nome);

        if (indexProduto !== -1) {
            const produtoAtual = itens[indexProduto];

            itens.splice(indexProduto, 1);

            const total = state.total - (produto.valor * produtoAtual.quantidade);
            setState({ ...state, total, itens });
        }
    }

    const formataValor = (valor) => {
        if (!valor) {
            valor = 0;
        }
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
        let pagamento = e.target.value;
        if (!pagamento) {
            pagamento = 0;
        }
        setState({ ...state, pagamento });
    }

    const arredondaPagamento = () => {
        const pagamento = parseFloat(state.pagamento).toFixed(2);
        setState({ ...state, pagamento });
    }

    const limparTela = () => {
        setState({ ...state, troco: 0, itens: [], total: 0, pagamento: 0.00 });
    }

    
    return (

        <div id="caixa-container">
            <section>
                {state.produtos.map((produto, index) => (
                    <div className="ficha" onClick={(e) => adicionaProduto(produto, e)} key={index} style={{ backgroundColor: produto.cor }}>
                        <div>
                            {produto.nome}
                        </div>
                        <div>
                            {formataValor(produto.valor)}
                        </div>
                        <div className="multipliers">
                            <div onClick={(e) => adicionaProduto(produto, e, 2)}>x2</div>
                            <div onClick={(e) => adicionaProduto(produto, e, 3)}>x3</div>
                            <div onClick={(e) => adicionaProduto(produto, e, 4)}>x4</div>
                            <div onClick={(e) => adicionaProduto(produto, e, 5)}>x5</div>
                        </div>
                    </div>
                ))}
            </section>

            <div id="container-pagamento">

                <h3>Valor Pagamento</h3>
                <input type="number" step="0.5" value={state.pagamento} onBlur={() => arredondaPagamento()} onChange={handleChange.bind(this)} placeholder="Valor pagamento"></input>
                <div className="container-notas">
                    <span style={{ backgroundColor: '#31467c' }} className="nota" onClick={() => adicionaNota(2)}>R$ 2</span>
                    <span style={{ backgroundColor: '#8d6482' }} className="nota" onClick={() => adicionaNota(5)}>R$ 5</span>
                    <span style={{ backgroundColor: '#c54037' }} className="nota" onClick={() => adicionaNota(10)}>R$ 10</span>
                    <span style={{ backgroundColor: '#e65729' }} className="nota" onClick={() => adicionaNota(20)}>R$ 20</span>
                    <span style={{ backgroundColor: '#d54b2b' }} className="nota" onClick={() => adicionaNota(50)}>R$ 50</span>
                    <span style={{ backgroundColor: '#387e8f' }} className="nota" onClick={() => adicionaNota(100)}>R$ 100</span>
                </div>
                <div>
                    <button className="btn-troco" onClick={() => calculaTroco()}>Calcular Troco</button>
                    <button className="btn-limpar" onClick={() => limparTela()}>Limpar tela</button>
                </div>
                <h3 className="mt-15 mb-15" >Troco: {formataValor(state.troco)}</h3>
            </div>

            <div className="pedido">
                <h3>Pedido Atual</h3>
                <ul>
                    {state.itens.map((item, index) => (
                        <li key={index}>{`- ${item.nome} (${item.quantidade})`}
                            <div>
                                <MdRemoveCircle onClick={() => diminuiProduto(item)} className="icon-remove ml-10" />
                                <MdCancel onClick={() => removeProduto(item)} className="icon-remove ml-5" />
                            </div>
                        </li>
                    ))}
                </ul>

                <h4>{`Total: ${formataValor(state.total)}`}</h4>

            </div>
        </div>
    );

}

export default Caixa;