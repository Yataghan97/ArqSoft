import json

with open("favoritos.json", "r", encoding="utf-8") as f:
    linhas = f.readlines()

linhas_formatadas = []

for linha in linhas:
    try:
        obj = json.loads(linha)

        # Lida com os dois tipos de campo "favorito"
        favorito = obj.get("__v")
        if favorito is None:
            favorito = obj.get("v")

        novo_obj = {
            "nome": obj.get("nome"),
            "dataCriacao": obj.get("dataCriacao"),
            "favorito": favorito
        }

        linhas_formatadas.append(json.dumps(novo_obj))

    except Exception as e:
        print(f"Erro na linha: {linha[:60]}... -> {e}")

# Salva o novo arquivo com apenas os campos filtrados
with open("jogos_filtrados.json", "w", encoding="utf-8") as f:
    for linha in linhas_formatadas:
        f.write(linha + "\n")
