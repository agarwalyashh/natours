const fs = require("fs");
const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);

exports.checkBody=(req,res,next)=>{
  const keys=Object.keys(req.body)
  if(!keys.includes('name')||!keys.includes('price'))
  {
    return res.status(400).json({
      status:"fail",
      message:"Missing name or price"
    })
  }
  next()
}

exports.checkID=(req,res,next,val)=>{
  if(Number(val)>toursData.length){
    return res.status(404).json({
      status:"fail",
      message:"Invalid ID"
    })
  }
  next();
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tours: toursData,
    },
  });
};

exports.getTour = (req, res) => {
  const length = toursData.length;
  const id = Number(req.params.id);
  if (id >= length) {
    res.status(404).send("No such tour exists");
  } else {
    const tour = toursData.find((tours) => tours.id === id);
    res.status(200).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  }
};

exports.createTour = (req, res) => {
  const newId = toursData[toursData.length - 1]["id"] + 1;
  const data = req.body;
  const newTour = { ...data, id: newId };
  toursData.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursData),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tours: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {};

exports.deleteTour = (req, res) => {
  //Some code here
  res.status(204).json({
    status: "success",
    data: null,
  });
};
