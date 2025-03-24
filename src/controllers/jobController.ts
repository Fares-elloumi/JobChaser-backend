import { Request, Response } from "express"
import { prisma } from "../config/db"


// CREATE
export const createJob = async (req: Request, res: Response) => {

    const { position, företag, plats, kontract, roleId } = req.body;

    

    try {
        
        const result = await prisma.job.create({
            data: {
                position: position,
                företag: företag,
                plats: plats,
                kontract: kontract,
                roleId: roleId
            }
        })

        if(result) {
            res.status(201).json({message: "Job created successfully", job: result})
        } else {
            res.status(400).json({error: "Job creation failed"})
        }

    } catch(error) {

        res.status(500).json({error: "Internal server error"});
    }

};

// READ ONE
export const getJob = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        

        const result = await prisma.job.findUnique({
            where: {
                id: (id)
            }
        })

        if(result) {
            res.status(200).json({message: "Job fetched successfuly", job: result});
        } else {
            res.status(404).json({error: "Job not found"});
        }

    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }

}


// READ MANY
export const getJobs = async (req: Request, res: Response) => {


    try {
        

        const result = await prisma.job.findMany();

        if(result) {
            res.status(200).json({message: "Users fetched successfully", user: result});
        } else {
            res.status(404).json({error: "Users not found"});
        }

    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }

};


// UPDATE 
export const updateJob = async (req: Request, res: Response) => {

    const { id } = req.params; 
    const { position, företag, plats, kontract, roleId } = req.body;

    
    try {

        const result = await prisma.job.update({
            where: {
                id: (id)
            },
            data: {
                position: position,
                företag: företag,
                plats: plats,
                kontract: kontract,
                roleId: roleId
            }
        })


          if(result) {
            res.status(200).json({message: "User updated successfuly"});
          } else {
            res.status(404).json({error: "User not found"});
          }

    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }


};


// DELETE
export const deleteJob = async (req: Request, res: Response) => {

        const { id } = req.params;

        try {
            
            const result = await prisma.job.delete({
                where: {
                    id: (id)
                }
            })
    
            res.status(200).json({message: "Job deleted successfully"});
    
        } catch(error) {
            res.status(500).json({error: "Internal server error"});
        }





};

