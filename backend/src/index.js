const { PrismaClient } = require('@prisma/client')
const express = require('express')
const app = express()
const port = 3000

const prisma = new PrismaClient()

app.use(express.json())

let escuderias = [{
	"id": 1,
	"nombre": "Mercedes",
	"pais": "Alemania",
}]
let pilotos = []
let carreras = []

app.get('/', (req, res) => {
	res.send('FORMULA 1 APP')
})

app.get('/api/v1/escuderias', async(req, res) => {
	const escuderias = await prisma.escuderia.findMany()
	res.json(escuderias)
})

app.get('/api/v1/escuderias/:id', (req, res) => {
	const escuderia = escuderias.find((e) => e.id === parseInt(req.params.id))
	res.json(escuderia)
})

/* app.post('/api/v1/escuderias', (req, res) => {

	const escuderia = {
		id: escuderias.length + 1,
		nombre: req.body.nombre,
		pais: req.body.pais,
	}

	escuderias.push(escuderia)
	res.status(201).send(escuderia)
	res.json(escuderia)
})

app.delete('/api/v1/escuderias/:id', (req, res) => {
	const escuderia = escuderias.find((e) => e.id == req.params.id)
	if(escuderia === undefined) {
		res.status(404).send()
		return
	}
	escuderias = escuderias.filter((e) => e.id != req.params.id)
	res.send(escuderia)
})

app.put('/api/v1/escuderias/:id', (req, res) => {
	let escuderia_index = escuderias.findIndex((e) => e.id == req.params.id)
	if(escuderia_index === -1) {
		res.sendStatus(404)
		return
	}
	escuderias[escuderia_index].nombre = req.body.nombre ?? escuderias[escuderia_index].nombre
	escuderias[escuderia_index].pais = req.body.pais ?? escuderias[escuderia_index].pais
	res.send(escuderias[escuderia_index])
}) */

app.listen(port, () => {
	console.log(`Formula1 app listening on port ${port}`)
})
