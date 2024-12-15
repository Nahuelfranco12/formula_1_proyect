const { PrismaClient } = require('@prisma/client')
require('dotenv').config();
const express = require('express')
const app = express()
const port = 3000

const prisma = new PrismaClient()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('FORMULA 1 APP')
})

app.get('/api/v1/escuderias', async(req, res) => {
	const escuderias = await prisma.escuderia.findMany()
	res.json(escuderias)
})

app.post('/api/v1/escuderias', async (req, res) => {
	
	const escuderias = await prisma.escuderia.create({
		data: {
			nombre_escuderia: req.body.nombre_escuderia,
			puntos_escuderia: req.body.puntos_escuderia,
			pais_escuderia: req.body.pais_escuderia,
			anio_creacion_escuderia: req.body.anio_creacion_escuderia,
			posicion_escuderia: req.body.posicion_escuderia
		}
	})
	res.status(201).send(escuderias)
})

app.get('/api/v1/escuderias/:id', async (req, res) => {
	const escuderia = await prisma.escuderia.findUnique({
		where: {
			id_escuderia: parseInt(req.params.id)
		}
	})

	if (escuderia === null) {
		res.sendStatus(404)
		return		
	}

	res.json(escuderia)
})

app.delete('/api/v1/escuderias/:id', async (req, res) => {
	const escuderia = await prisma.escuderia.findUnique({
		where: {
			id_escuderia: parseInt(req.params.id)
		}
	})
	
	if(escuderia === null) {
		res.sendStatus(404)
		return
	}
	
	await prisma.escuderia.delete({
		where: {
			id_escuderia: parseInt(req.params.id)
		}
	})
	
	res.send(escuderia)
})

app.put('/api/v1/escuderias/:id', async (req, res) => {
	
	const escuderia = await prisma.escuderia.findUnique({
		where: {
			id_escuderia: parseInt(req.params.id)
		}
	})

	if(escuderia === null) {
		res.sendStatus(404)
		return
	}

	await prisma.escuderia.update({
		where: {
			id_escuderia: escuderia.id_escuderia
		},
		data: {
			nombre_escuderia: req.body.nombre_escuderia,
			puntos_escuderia: req.body.puntos_escuderia,
			pais_escuderia: req.body.pais_escuderia,
			anio_creacion_escuderia: req.body.anio_creacion_escuderia,
			posicion_escuderia: req.body.posicion_escuderia
		}
	})

	res.send(escuderia)
})

app.listen(port, () => {
	console.log(`Formula1 app listening on port ${port}`)
})
