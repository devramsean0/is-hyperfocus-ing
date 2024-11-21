use std::{
    io::{prelude::*, BufReader}, net::{TcpListener, TcpStream}
};

use backend::ThreadPool;
use url_search_params::parse_url_search_params;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    let pool = ThreadPool::new(5);
    for stream in listener.incoming() {
        let stream = stream.unwrap();
        pool.execute(|| {
            handle_http_connection(stream);
        });
        println!("Connection Established")
    }
    println!("Hello, world!");
}

fn handle_http_connection(mut stream: TcpStream) {
    let mut buf_reader = BufReader::new(&mut stream);
    let mut headers = String::new();

    // Read headers until an empty line is encountered
    loop {
        let mut line = String::new();
        let bytes_read = buf_reader.read_line(&mut line).unwrap();
        if bytes_read == 0 || line == "\r\n" {
            break;
        }
        headers.push_str(&line);
    }
    let status_line = "HTTP/1.1 200 OK";

    if headers.starts_with("GET / HTTP/1.1") {
        // Home Request
        let content = "Hello World!";
        let content_length = content.len();
        let response = format!("{status_line} \r\nContent-Length: {content_length}\r\n\r\n{content}");
        stream.write_all(response.as_bytes()).unwrap();
    } else if headers.starts_with("POST /apply HTTP/1.1") {
        // Apply API Route
            // Get Content Length stuff
        let req_content_length = headers
            .lines()
            .find(|line| line.to_lowercase().starts_with("content-length:"))
            .and_then(|line| line.split(':').nth(1))
            .and_then(|len| len.trim().parse::<usize>().ok())
            .unwrap_or(0);
        let mut req_body = String::new();
        if req_content_length > 0 {
            buf_reader
                .take(req_content_length as u64)
                .read_to_string(&mut req_body)
                .unwrap();
        }
        let parsed_req_body = parse_url_search_params(&req_body);
            // Respond

        let content = "Hello World!";
        let content_length = content.len();
        let response = format!("{status_line}\r\nAccess-Control-Allow-Origin: *\r\nContent-Length: {content_length}\r\n\r\n{content}");
        stream.write_all(response.as_bytes()).unwrap();
    } else {
        let content: &str = "Route not found!";
        let content_length = content.len();
        let response = format!("HTTP/1.1 404 NOT FOUND \r\nContent-Length: {content_length}\r\n\r\n{content}");
        stream.write_all(response.as_bytes()).unwrap();
    }
    println!("Headers: {headers:#?}");
}
