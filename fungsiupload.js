async function uploadHandler(m, q, usedPrefix) {
    if (!q.mimetype) throw `Reply media dengan perintah ${usedPrefix}upload`
    
    try {
        m.reply('Sedang mengupload...')
        
        let media = await q.download()
        let base64 = media.toString('base64')

        const result = await imagekit.upload({
            file: base64,
            fileName: `file_${Date.now()}`,
            folder: "/uploads", 
            tags: ["uploaded", q.mimetype.split('/')[0]],
            useUniqueFileName: true,
            responseFields: ["tags", "customCoordinates", "isPrivateFile", "url", "thumbnail", "fileType", "filePath", "height", "width", "size", "hasAlpha", "mime"]
        })

        return m.reply(`
📤 *Upload Berhasil!*
📝 *Nama:* ${result.name}
📁 *Path:* ${result.filePath}
📊 *Ukuran:* ${formatSize(result.size)}
📏 *Dimensi:* ${result.width || '-'} x ${result.height || '-'}
🏷️ *Tags:* ${result.tags.join(', ')}
📋 *Type:* ${result.fileType}
🔒 *Private:* ${result.isPrivateFile ? 'Yes' : 'No'}
🔗 *URL:* ${result.url}
        `)
    } catch (e) {
        throw `Upload gagal: ${e.message}`
    }
}