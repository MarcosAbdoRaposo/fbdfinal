      const API_URL = "http://localhost:3000/users";

      async function carregarAnimais() {
          console.log('Entrou na CarregarAnimais')
          const res = await fetch(API_URL);
          console.log('Depois do Fetch')
          console.log(res)
          const animais = await res.json();
          console.log('Depois do res.jason')
          const tabela = document.getElementById("clientTable");
          tabela.innerHTML = "";
          let contadorDeItens = 0;
          animais.forEach(animal => {
              const row = document.createElement("tr");
              contadorDeItens++;
              let dataBr = new Date(animal.data_nascimento).toLocaleDateString('pt-BR')
              row.innerHTML = `
                  <td>${contadorDeItens}</td>
                  <td>${animal.codigo_lacre}</td>
                  <td>${animal.nome_animal}</td>
                  <td>${animal.codigo_registro}</td>
                  <td>${animal.codigo_registro_pai}</td>
                  <td>${animal.codigo_registro_mae}</td>
                  <td>${animal.peso_inicial}</td>
                  <td>${dataBr}</td>
                  <td class="actions">
                  <button onclick="editarAnimal(${animal.id})">Editar</button>
                  <button onclick="excluirAnimal(${animal.id})">Excluir</button>
                  </td>
              `;
              tabela.appendChild(row);
              });
      }

      async function salvarAnimal(e) {
          if (criticaAnimal()) {
          
            //e.preventDefault();

            // Cria json com os dados a seren enviados

            const id = document.getElementById("id").value;
            const data = {
            codigo_lacre: document.getElementById("codigo_lacre").value,
            nome_animal: document.getElementById("nome_animal").value,
            codigo_registro: document.getElementById("codigo_registro").value,
            codigo_registro_pai: document.getElementById("codigo_registro_pai").value,
            codigo_registro_mae: document.getElementById("codigo_registro_mae").value,
            peso_inicial: parseFloat(document.getElementById("peso_inicial").value),
            data_nascimento: document.getElementById("data_nascimento").value,

            };

            console.log('Jason Data:',data)

            // se existir id então é atualização, senão inclusão
            // Post inserir 
            // Put Atualizar 

            let metodo = ""
            let url = ""
            if (id > 0){
                metodo = "PUT"
                url = `${API_URL}/${id}` 
            } else {
                metodo = "POST"
                url =  API_URL;
            }
            //const metodo = id ? "PUT" : "POST";
            //const url = id ? `${API_URL}/${id}` : API_URL;

            console.log(`id:${id}`)
            console.log(`metodo:${metodo}`)
            try {
                await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                });
            } catch (erro) {
              console.error('Erro ao chamar:', erro.message);
            }

            // document.getElementById("animalForm").reset();

            // Recarrega a Grade a tela
            ocultarFormulario();
            carregarAnimais();
       }
      }

      async function editarAnimal(id) {

          // Obtem os dados de um determinado animal
          const res = await fetch(`${API_URL}/${id}`, { method: "GET" });
          const animal = await res.json();

          //let dataBr = new Date(animal.data_nascimento).toLocaleDateString('pt-BR')

          document.getElementById("id").value = id;
          document.getElementById("codigo_lacre").value = animal.codigo_lacre;
          document.getElementById("nome_animal").value = animal.nome_animal;
          document.getElementById("codigo_registro").value = animal.codigo_registro;
          document.getElementById("codigo_registro_pai").value = animal.codigo_registro_pai;
          document.getElementById("codigo_registro_mae").value = animal.codigo_registro_mae;
          document.getElementById("peso_inicial").value = animal.peso_inicial;

          //const data_nascimento = new Date(animal.data_nascimento);
         //document.getElementById("data_nascimento").value = new Date(animal.data_nascimento).toISOString;
          preencherInputDate('data_nascimento', new Date(animal.data_nascimento));
          exibirFormulario()

      }

      async function excluirAnimal(id) {
          if (confirm("Deseja excluir este animal?")) {
          await fetch(`${API_URL}/${id}`, { method: "DELETE" });
          carregarAnimais();
          }
      }

      function exibirFormulario() {

        document.getElementById("areaEdicao").hidden = false
        document.getElementById("areaLista").hidden = true
      }

      function ocultarFormulario() {
        document.getElementById("areaEdicao").hidden = true
        document.getElementById("areaLista").hidden = false
      }

      function limparCamposFormulario() {
          document.getElementById("id").value = 0;
          document.getElementById("codigo_lacre").value = "";
          document.getElementById("nome_animal").value = "";
          document.getElementById("codigo_registro").value = "";
          document.getElementById("codigo_registro_pai").value = "";
          document.getElementById("codigo_registro_mae").value = "";
          document.getElementById("peso_inicial").value = "";
          document.getElementById("data_nascimento").value = "";

      }

      function novoAnimal() {
        limparCamposFormulario();
        document.getElementById("id").value = 0;
        exibirFormulario();
      }

      function criticaAnimal() {
          if (document.getElementById("codigo_lacre").value == "") {
            alert("Código do Lacre do Animal não fornecido.");
            return false;
          }
          if (document.getElementById("nome_animal").value == "") {
            alert("Nome do Animal não fornecido.");
            return false;
          }
          
          if (document.getElementById("codigo_registro").value == "") {
            alert("Código do Registro do Animal não fornecido.");
            return false;
          };
          if (document.getElementById("codigo_registro_pai").value == "") {
            alert("Código do Registro Pai do Animal não fornecido.");
            return false;
          };
          if (document.getElementById("codigo_registro_mae").value == "") {
            alert("Código do Registro da Mãe do Animal não fornecido.");
            return false;
          };
          if (document.getElementById("peso_inicial").value == "") {
            alert("Peso Inicial do Animal não fornecido.");
            return false;
          };
          if (document.getElementById("data_nascimento").value == "") {
            alert("Data de Nascimento do Animal não fornecida.");
            return false;
          };

          return true;

      }


    function preencherInputDate(idInput, objetoData) {
        const inputElement = document.getElementById(idInput);
        
        // 1. Obter o ano
        const ano = objetoData.getFullYear();
        
        // 2. Obter e formatar o mês (getMonth() é base 0, por isso somamos 1)
        const mes = String(objetoData.getMonth() + 1).padStart(2, '0');
        
        // 3. Obter e formatar o dia
        const dia = String(objetoData.getDate()).padStart(2, '0');
        
        // 4. Montar a string no formato AAAA-MM-DD
        const dataFormatada = `${ano}-${mes}-${dia}`;
        
        // 5. Atribuir ao input
        inputElement.value = dataFormatada;
    }

      //document.getElementById("animalForm").addEventListener("submit", salvarAnimal);
      carregarAnimais();