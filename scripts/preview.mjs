import http from "node:http"
import fs from "node:fs"
import path from "node:path"

const directory = path.resolve("out")
const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".gz": "application/gzip",
  ".txt": "text/plain",
}
http
  .createServer((request, response) => {
    let pathname
    try {
      pathname = decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      )
    } catch {
      response.writeHead(400).end()
      return
    }
    if (prefix && pathname !== prefix && !pathname.startsWith(`${prefix}/`)) {
      response.writeHead(404).end()
      return
    }
    const local = pathname.slice(prefix.length) || "/"
    let file = path.resolve(directory, `.${local}`)
    if (!file.startsWith(`${directory}${path.sep}`) && file !== directory) {
      response.writeHead(403).end()
      return
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, "index.html")
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      response.writeHead(404, { "Content-Type": "text/html" })
      response.end(fs.readFileSync(path.join(directory, "404.html")))
      return
    }
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)] ?? "application/octet-stream",
    })
    fs.createReadStream(file).pipe(response)
  })
  .listen(4173, "127.0.0.1", () =>
    console.log(`Local: http://127.0.0.1:4173${prefix}/`),
  )
