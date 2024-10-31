import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { promisify } from 'util';
import { exec } from 'child_process';
import { promises as fs, createWriteStream } from "fs";
import type { IClaimRepository } from "./Repository";

const execAsync = promisify(exec);

type FileType = {
  fileName: string;
  data: string;
  extension: string;
};

const allowedExtensions = ["json"];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class ClaimLocalFilesRepository implements IClaimRepository {
  private directoryPath: string;
  private files: FileType[];

  constructor(directoryPath: string = "../../mrfs", files: FileType[] = []) {
    this.directoryPath = directoryPath;
    this.files = files;
  }

  async list(): Promise<string[]> {
    try {
      const directoryPath = path.join(__dirname, this.directoryPath);
      return await fs.readdir(directoryPath);
    } catch (error) {
      console.error("Error reading directory:", error);
      throw error;
    }
  }

  async listByUserId(userId: number): Promise<string[]> {
    try {
      const directoryPath = path.join(__dirname, "../../mrfs");
      const files = await fs.readdir(directoryPath);
      return files.filter((file) => file.startsWith(`${userId}_`));
    } catch (error) {
      console.error("Error reading directory:", error);
      throw error;
    }
  }

  resetFiles(): void {
    this.files = [];
  }

  addFile(fileName: string, data: string, extension: string = "json"): void {
    if (!allowedExtensions.includes(extension)) {
      throw new Error(`Extensions allowed: ${allowedExtensions.join(", ")}`);
    }
    this.files.push({ fileName, data, extension });
  }

  async save(): Promise<boolean> {
    try {
      const directoryPath = path.join(__dirname, this.directoryPath);
      await fs.mkdir(directoryPath, { recursive: true });

      for (const item of this.files) {
        const filePath = path.join(directoryPath, `${item.fileName}.${item.extension}`);
        const writeStream = createWriteStream(filePath);
        writeStream.write(item.data);
        writeStream.end();
      }
      return true;
    } catch (error) {
      console.error("Error writing file in directory:", error);
      throw error;
    }
  }

  async find(fileName: string): Promise<string> {
    try {
      const filePath = path.join(__dirname, this.directoryPath, fileName);
      return await fs.readFile(filePath, "utf8");
    } catch (error) {
      console.error("Error reading file:", error);
      throw error;
    }
  }

  async search(search: string): Promise<string[]> {
    try {
      const directoryPath = path.join(__dirname, this.directoryPath);
      const command = `grep -rl "${search}" ${directoryPath}`;
      const { stdout } = await execAsync(command);
      const files = stdout.split('\n')
        .filter(file => file)
        .map(file => file.replace(directoryPath + '/', ''));
      return files;
    } catch (error:any) {
      if (error.code === 'ENOENT') {
        console.error("Directory does not exist:", this.directoryPath);
      } else if (error.code === 1) {
        console.error("No files matched the search pattern.");
        return [];
      } else {
        console.error("Error searching files:", error);
      }
      throw error;
    }
  }

  async delete(fileName: string): Promise<boolean> {
    try {
      const directoryPath = path.join(__dirname, this.directoryPath);
      const filePath = path.join(directoryPath, fileName);
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

  async update(fileName: string, json: string): Promise<boolean> {
    try {
      const directoryPath = path.join(__dirname, this.directoryPath);
      const filePath = path.join(directoryPath, fileName);
      await fs.writeFile(filePath, json);
      return true;
    } catch (error) {
      console.error("Error updating file:", error);
      throw error;
    }
  }
}
