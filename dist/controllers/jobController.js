"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.getJobs = exports.getJob = exports.createJob = void 0;
//import { query } from "../config/db"
//import { User } from "../types";
const db_1 = require("../config/db");
// CREATE
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { position, företag, plats, kontract, roleId } = req.body;
    try {
        const result = yield db_1.prisma.job.create({
            data: {
                position: position,
                företag: företag,
                plats: plats,
                kontract: kontract,
                roleId: roleId
            }
        });
        if (result) {
            res.status(201).json({ message: "Job created successfully", job: result });
        }
        else {
            res.status(400).json({ error: "Job creation failed" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createJob = createJob;
// READ ONE
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Hämta url-parameter
    const { id } = req.params;
    try {
        const result = yield db_1.prisma.job.findUnique({
            where: {
                id: (id)
            }
        });
        if (result) {
            res.status(200).json({ message: "Job fetched successfuly", job: result });
        }
        else {
            res.status(404).json({ error: "Job not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getJob = getJob;
// READ MANY
const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.prisma.job.findMany();
        if (result) {
            res.status(200).json({ message: "Users fetched successfully", user: result });
        }
        else {
            res.status(404).json({ error: "Users not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getJobs = getJobs;
// UPDATE 
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // URL-parameter
    const { position, företag, plats, kontract, roleId } = req.body;
    try {
        const result = yield db_1.prisma.job.update({
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
        });
        if (result) {
            res.status(200).json({ message: "User updated successfuly" });
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateJob = updateJob;
// DELETE
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_1.prisma.job.delete({
            where: {
                id: (id)
            }
        });
        res.status(200).json({ message: "Job deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteJob = deleteJob;
