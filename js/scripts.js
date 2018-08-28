const {app, Menu, BrowserWindow, dialog} = require('electron')
var $ = require('jQuery');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');


const saltRounds = 10;
const myPlaintextPassword = '123123';
const someOtherPlaintextPassword = 'not_bacon'

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'siscaixa',
});

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  console.log(hash);
});


function inserirProdutos(nomeValor, quantidadeValor, precoValor){
	connection.execute(
		"INSERT INTO produtos(nome, quantidade, preco) VALUES (?,?,?)",
		[nomeValor, quantidadeValor, precoValor],	
		function(err, results, fields){
			if(err == null){
				document.querySelector('#resposta').innerHTML = "Produto gravado com sucesso.";
			} else {
				document.querySelector('#resposta').innerHTML = "Erro ao registrar produto.";
			}
		}
	);	
}

// Pode usar o jQuery normalmente agora.
$(document).ready(function(){ 

	activeLogin = false;

    $('#logarUsuario').click(function(e){
      	e.preventDefault();       	
        const nome = $('#usuario').val();
        const senha = $('#senha').val();

        function authenticate(){
        	connection.execute(
			"SELECT * FROM usuario WHERE login = ?",
			[nome],	
			function(err, results, fields){
				if(results){
					bcrypt.compare(senha, results[0].senha, function(err, res) {
						if(res){
		    				window.location.href = "pages/sistema.html";
				    	} else {
				    		document.querySelector('.resposta').innerHTML = "<div class='alert alert-warning' role='alert'>Login ou senha incorreto.</div>";
				    	}
					});
				}
			});
        }
        authenticate();
    });

    $('#salvarProduto').click(function(e){
      	e.preventDefault();
      	console.log("Ojk");
        const nome = $('#nome').val();
        const quantidade = $('#quantidade').val();
        const precoCusto = $('#precoCusto').val();
        const precoVenda = $('#precoVenda').val();
        inserirProdutos(nome, quantidade, precoVenda);
    });


});