from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from bd import newConnection, closeConnection
import psycopg2



app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Criar um produto
@app.route('/produtos', methods=['POST'])
@cross_origin()
def create_product():
    tipo = request.json['tipo']
    modelo = request.json['modelo']
    preco = request.json['preco']
    quantidade = request.json['quantidade']
    imagem = request.json['imagem']

    cur, conn = newConnection()
    cur.execute("INSERT INTO produtos (tipo, modelo, preco, quantidade, imagem) VALUES (%s, %s, %s, %s, %s) RETURNING *", (tipo, modelo, preco, quantidade, imagem))
    new_product = cur.fetchone()
    closeConnection(cur, conn)

    return jsonify(new_product), 201

# Listar todos os produtos
@app.route('/produtos')
def get_products():
    cur, conn = newConnection()
    cur.execute("SELECT * FROM produtos")
    produtos = cur.fetchall()
    closeConnection(cur, conn)
    
    result = []
    for produto in produtos:
        item = {
            'id': produto[0],
            'tipo': produto[1],
            'modelo': produto[2],
            'preco': produto[3],
            'quantidade': produto[4],
            'imagem': produto[5],
        }
        result.append(item)
    
    return jsonify(result)




# Ler um produto pelo id
@app.route('/produtos/<int:id>', methods=['GET'])
@cross_origin()
def get_product(id):
    cur, conn = newConnection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM produtos WHERE id = %s", (id,))
    product = cur.fetchone()
    closeConnection(cur, conn)

    if product is None:
        return jsonify({'error': 'Produto não encontrado'}), 404

        return jsonify({
        'id': product[0],
        'tipo': product[1],
        'modelo': product[2],
        'preco': product[3],
        'quantidade': product[4],
        'imagem': product[5],
    }), 200

# Atualizar um produto pelo id
@app.route('/produtos/<int:id>', methods=['PUT'])
@cross_origin()
def update_product(id):
    tipo = request.json['tipo']
    modelo = request.json['modelo']
    preco = request.json['preco']
    quantidade = request.json['quantidade']
    imagem = request.json['imagem']

    cur, conn = newConnection()
    cur.execute("UPDATE produtos SET tipo = %s, modelo = %s, preco = %s, quantidade = %s, imagem = %s WHERE id = %s RETURNING *", (tipo, modelo, preco, quantidade, imagem, id))
    updated_product = cur.fetchone()
    closeConnection(cur, conn)

    if updated_product is None:
        return jsonify({'error': 'Produto não encontrado'}), 404

    return jsonify(updated_product), 200


# Excluir um produto pelo id
@app.route('/produtos/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_product(id):
    cur, conn = newConnection()
    cur.execute("DELETE FROM produtos WHERE id = %s", (id,))
    num_rows_deleted = cur.rowcount
    closeConnection(cur, conn)

    if num_rows_deleted == 0:
        return jsonify({'error': 'Produto não encontrado'}), 404
    else:
        conn.commit()
        return '', 204

if __name__ == '__main__':
    app.run(port=3000)
    
