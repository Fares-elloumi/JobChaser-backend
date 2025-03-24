import { Request, Response } from "express"
import { prisma } from "../config/db"
import { resolve } from "path";


// CREATE
export const createRole = async (req: Request, res: Response) => {

    const { name } = req.body;

    

    try {
        
        const result = await prisma.role.create({
            data: {
                name: name,
               
            }
        })

        if(result) {
            res.status(201).json({message: "Role created successfully", rol: result})
        } else {
            res.status(400).json({error: "Role creation failed"})
        }

    } catch(error) {

        res.status(500).json({error: "Internal server error"});
    }

};

// READ ONE
export const getRole = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        

        const result = await prisma.role.findUnique({
            where: {
                id: (id)
            }
        })

        if(result) {
            res.status(200).json({message: "Role fetched successfuly", rol: result});
        } else {
            res.status(404).json({error: "Role not found"});
        }

    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }

}


// READ MANY
export const getRoles = async (req: Request, res: Response) => {


    try {
        

        const result = await prisma.role.findMany();

        if(result) {
            res.status(200).json({message: "Roles fetched successfully", rol: result});
        } else {
            res.status(404).json({error: "Roles not found"});
        }

    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }

};


// UPDATE 
export const updateRole = async (req: Request, res: Response) => {

    const { id } = req.params; 
    const { name } = req.body;

    
    try {

        const result = await prisma.role.update({
            where: {
                id: (id)
            },
            data: {
                name: name
            }
        })


          if(result) {
            res.status(200).json({message: "Role updated successfuly"});
          } else {
            res.status(404).json({error: "Role not found"});
          }

    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }


};


// DELETE
export const deleteRole = async (req: Request, res: Response) => {

        const { id } = req.params;

        try {
            
            const result = await prisma.role.delete({
                where: {
                    id: (id)
                }
            })
    
            res.status(200).json({message: "Job deleted successfully"});
    
        } catch(error) {
            res.status(500).json({error: "Internal server error"});
        }





};

