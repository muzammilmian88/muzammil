import mongoose from "mongoose";
import ResponsibilityMatrix from "../models/responsibility_matrix.js";
// import r_matrix_model from "../models/responsibility_matrix.js";







export const get_All_r_matrix = async (req, res) => {
  try {
    const r_matrixs = await ResponsibilityMatrix.find({deleteStatus:false});
    // console.log(r_matrixs)
    
    res.status(200).json(r_matrixs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const SingleMatrix = async (req, res) => {
  try {
    const r_matrixs = await ResponsibilityMatrix.find({_id:req.params.id});
    
    res.status(200).json(r_matrixs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createResponsibilityMatrix = async (req, res) => {
  const r_matrix = req.body;
   
  try {
    const existing_r_matrix = await ResponsibilityMatrix.findOne({
      name: r_matrix?.name,
    });
    if (existing_r_matrix) {
      if (!existing_r_matrix?.deleteStatus) {
        return res.status(201).send({ message: "Name already exist" });
      } else {
        
        const updateResponsibilityMatrix = await ResponsibilityMatrix.findByIdAndUpdate(
          existing_r_matrix?._id,
          { deleteStatus: false },
          {
            new: true,
          }
        );
      }
    }

    
    
    const new_r_matrix = new ResponsibilityMatrix({...r_matrix});
    
    await new_r_matrix.save();

    res.status(200).json({error:false, message: "Responsibility Matrix  Added" });

  } catch (error) {
    res.status(404).json({error:true, message: error.message });
  }
};

export const updateResponsibilityMatrix = async (req, res) => {
  const id = req.params.id;
  const responsibilityMatrix = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No responsibilityMatrix with that id");
  try {
    const existingResponsibilityMatrix = await ResponsibilityMatrix.findOne({
      name: responsibilityMatrix?.name,
      _id: { $ne: id },
    });
    if (existingResponsibilityMatrix) {
      if (!existingResponsibilityMatrix?.deleteStatus) {
        return res.status(201).send({ message: "Name already exist" });
      } else {
        await ResponsibilityMatrix.findByIdAndRemove(existingResponsibilityMatrix?._id);
      }
    }
    const updateResponsibilityMatrix = await ResponsibilityMatrix.findByIdAndUpdate(id, responsibilityMatrix, {
      new: true,
    });
    res.status(200).json({
      error:false,
      message:"ResponsibilityMatrix Updated Successfully",
    });
  } catch (error) {
    res.status(404).json({error:true, message: error.message });
  }
};
export const delete_res_matrix = async (req, res) => {
  // console.log("gggg");
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No responsibility with that id");
  const delete_r_matrix = await ResponsibilityMatrix.findByIdAndRemove(
    id  
  );
  res.status(200).json(delete_r_matrix);
};


