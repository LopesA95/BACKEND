const fs = require('fs').promises;
const path = require('path');
const uploadConfig = require('../configs/upload');

class DiskStorage {
  async saveFile(file) {
    if (!file || typeof file !== 'string') {
      throw new Error('O nome do arquivo deve ser uma string válida.');
    }

    const sourceFilePath = path.resolve(uploadConfig.TMP_FOLDER, file);
    const destinationFilePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file);

    try {
      await fs.rename(sourceFilePath, destinationFilePath);
      return file;
    } catch (error) {
      throw new Error(`Erro ao salvar o arquivo: ${error.message}`);
    }
  }

  async deleteFile(file) {
    if (!file || typeof file !== 'string') {
      throw new Error('O nome do arquivo deve ser uma string válida.');
    }

    const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file);

    try {
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Arquivo não encontrado, pode ser que já tenha sido deletado
        return;
      }
      throw new Error(`Erro ao deletar o arquivo: ${error.message}`);
    }
  }
}

module.exports = DiskStorage;
