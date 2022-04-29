const { Router } = require('express');
const { PrismaClient } =require('@prisma/client'); 
const prisma = new PrismaClient();

const router = Router();

router.get('/', async (req, res, next) => {
  let usuario;
    if(req.session.userId){
      usuario=await prisma.usuario.findUnique({where:{idusuario:req.session.userId}})
    }
    
    res.render('home',{usuario})
  });

module.exports=router;