export interface GithubUser {
    login: string,
    id: number,
    email: string,
    name: string,
}

export const getGithubUserFirstname = (user: GithubUser): string => user.name.split(' ')[0];

export const getGithubUserLastname = (user: GithubUser): string => user.name.split(' ')[1];
