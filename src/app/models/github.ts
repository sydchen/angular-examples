export interface Commit {
    sha: string;
    message: string;
    author: string;
    date: string;
}

export interface Repo {
    name: string;
    url: string;
    language: string;
}