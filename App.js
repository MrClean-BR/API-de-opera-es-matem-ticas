const express = require('express');
const app = express();

// Soma
app.get('/somar/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const resultado = a + b;
    res.json({ resultado });
});

// subtrair
app.get('/subtrair/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const resultado = a - b;
    res.json({ resultado });
});

// multiplicar
app.get('/multiplicar/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const resultado = a * b;
    res.json({ resultado });
});

// divisão
app.get('/dividir/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    if (b === 0) {
        res.status(400).json({ error: 'Não há como dividir um número por zero.' });
    } else {
        const resultado = a / b;
        res.json({ resultado });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//exportação para o App

module.exports = app; 

 
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('Operações de matemática', () => {
    it('faça a soma dos números', (done) => {
        chai.request(app)
            .get('/somar/2/3')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('resultado').eql(5);
                done();
            });
    });

    it('subtrair um número de outro', (done) => {
        chai.request(app)
            .get('/subtrair/5/2')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('resultado').eql(3);
                done();
            });
    });

    it('multiplicar dois números', (done) => {
        chai.request(app)
            .get('/multiplicar/4/3')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('resultado').eql(12);
                done();
            });
    });

    it('divisão de um número por outro', (done) => {
        chai.request(app)
            .get('/dividir/10/2')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('resultado').eql(5);
                done();
            });
    });

    it('retorna erro ao dividir por zero', (done) => {
        chai.request(app)
            .get('/dividir/10/0')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Não é possível dividir por zero.');
                done();
            });
    });
});


json
"scripts": {
    "test": "mocha"
}

