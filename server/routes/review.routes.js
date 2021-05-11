const router = require("express").Router();
const ReviewModel = require("../models/Review.model");
const RoomModel = require("../models/Room.model");


// Criar uma nova review 
router.post("/review", async (req, res) => {
  try {
    
    // Criar a review
    const result = await ReviewModel.create(req.body);

    // Atualizar as reviews deste usuário
    const updatedRoom = await RoomModel.findOneAndUpdate(
      { _id: req.body.roomId },
      { $push: { reviews: result._id } },
      { new: true }
    );

    console.log(updatedRoom);


    // Responde o resultado pro cliente
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});


router.patch("/review/:id", async (req, res) => {
  try {
    // O findOneAndUpdate() vai buscar um documento que atenda à consulta do primeiro parâmetro, e, caso encontre, atualizar com o conteúdo do segundo parâmetro. Ao final da atualização, retornará o objeto atualizado
    const updatedReview = await ReviewModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    console.log(updatedReview);
    // Se o findOne() retornar null, ou seja, não encontrar o review no banco, retornamos um 404 dizendo que não encontramos o review
    if (!updatedReview) {
      return res.status(404).json({ msg: "Review not found" });
    }

    return res.status(200).json(updatedReview);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

router.delete("/review/:id", async (req, res) => {
  try {
    const deleted = await Reviewmodel.deleteOne({ _id: req.params.id });

    if (!deleted) {
      return res.status(404).json({ msg: "Review not found" });
    }

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

router.get("/room/:id/review", async (req, res) => {
  try {
    const reviewsList = await RoomModel.findOne({
      _id: req.params.id,
    }).populate("reviews");

    return res.status(200).json(reviewsList);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});




module.exports = router;
