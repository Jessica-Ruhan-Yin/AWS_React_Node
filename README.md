# AWS_React_Node
This is a highly scalable MERN Stack app with AWS for Storage (S3) Email (SES) Hosting (EC2) IAM and more <br/>
<img src='https://react-node-aws-storage.s3.us-east-1.amazonaws.com/screenshots/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220604173106.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkcwRQIhAIuAWscpqWyA6N5DixwCxY9o%2FhIdL%2BUMmngADhr%2FJ3TKAiAsQibZ2dN6L20LSzKZM7MboaFm2evfOsLPljGYNe4z3yrtAgiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDU2MjMwNTU0ODQ5NyIMnGisxX4Yqjkp%2B%2FhLKsECLyNIVuuZaxbvMckbnMSldeY9oFwKOG2E4jqgyM4IuX0h4w67h88AFfLX4NKtBoWKuE0ghWeGh5vmL9JqfnAhThMOH101GimP%2Bgt%2B%2FQtqvdalkbfXD1NDIsuqF8pcs7BS9pTjA%2FifB5BpSlcZpVmHs10egv%2BR2tlFZteFfFGslqOzw9hWed4lYAciJaUvtekXWhjDFdgJLJb7n66vPteq31zCRhas%2Bz1AS2%2FwVOn1BNQCdGN4ltWfQKlKogSumORTOzCUrXfUz1p3X3Gfh7c6GoOL3%2FUUTodzFFZhxWZSkbfMaJiqcrNLVPKqTrQggxq3hrBZPfxU6Lkicsld8gYkSLwY8MqCt%2BYz9fUJowNc3%2BFp0lAaBl0p47Deb8cDrAvpHqxbPNwuaX2aEJpcmBxfeGuqYpnYn2M6xD4eGPPsVbmUMM6165QGOrMCpj%2BlmiaQx7AZoA6x1vZxgAbcRQSspYt9%2FW0LyNUhc9cTAUwNUHUdiQceM1SFR4jPU5duHPLMGNl3EEtaBptI3TdbrNtDQtO3xvmyqIxT0JIxKjbpxg%2FCH4sL9Z6XOsdaU9zvG4QH5LbH6PU7CLrHctoH0HL6rbJmU2aD%2Bzp6Rqj4EH8%2BBFBV0Ag%2Bgk3%2BfHyJAr8IRpn2l8Tf0XTavY%2FU2ruT4%2B%2FNKa%2BBdwZz1XWhMOH0UvnARpBfumthjYwcj2id38Mk9eYd7IA%2Fak41VbL8XlU%2BXjQu9Kjo9VClfxyMlUusJo%2FrNGENJm0%2FjLEeus0FeE0C5IaRPjPSHavhBbLW18%2BfK9IMGdEGjne5FABvjlvRFHX2fcKI%2FPQy%2BEW9KrpNEQLrkbpx8YUb2AEEaDRlPbJE%2FQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220604T094441Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYF3AFYDIVTIL2EUR%2F20220604%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=051d2f327fa0dbadba0b4a16519af820d263022ec8d19b0d5c752d2606ef4c5b' width=800px/><br/>
<img src='https://react-node-aws-storage.s3.us-east-1.amazonaws.com/screenshots/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220604173114.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkcwRQIhAIuAWscpqWyA6N5DixwCxY9o%2FhIdL%2BUMmngADhr%2FJ3TKAiAsQibZ2dN6L20LSzKZM7MboaFm2evfOsLPljGYNe4z3yrtAgiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDU2MjMwNTU0ODQ5NyIMnGisxX4Yqjkp%2B%2FhLKsECLyNIVuuZaxbvMckbnMSldeY9oFwKOG2E4jqgyM4IuX0h4w67h88AFfLX4NKtBoWKuE0ghWeGh5vmL9JqfnAhThMOH101GimP%2Bgt%2B%2FQtqvdalkbfXD1NDIsuqF8pcs7BS9pTjA%2FifB5BpSlcZpVmHs10egv%2BR2tlFZteFfFGslqOzw9hWed4lYAciJaUvtekXWhjDFdgJLJb7n66vPteq31zCRhas%2Bz1AS2%2FwVOn1BNQCdGN4ltWfQKlKogSumORTOzCUrXfUz1p3X3Gfh7c6GoOL3%2FUUTodzFFZhxWZSkbfMaJiqcrNLVPKqTrQggxq3hrBZPfxU6Lkicsld8gYkSLwY8MqCt%2BYz9fUJowNc3%2BFp0lAaBl0p47Deb8cDrAvpHqxbPNwuaX2aEJpcmBxfeGuqYpnYn2M6xD4eGPPsVbmUMM6165QGOrMCpj%2BlmiaQx7AZoA6x1vZxgAbcRQSspYt9%2FW0LyNUhc9cTAUwNUHUdiQceM1SFR4jPU5duHPLMGNl3EEtaBptI3TdbrNtDQtO3xvmyqIxT0JIxKjbpxg%2FCH4sL9Z6XOsdaU9zvG4QH5LbH6PU7CLrHctoH0HL6rbJmU2aD%2Bzp6Rqj4EH8%2BBFBV0Ag%2Bgk3%2BfHyJAr8IRpn2l8Tf0XTavY%2FU2ruT4%2B%2FNKa%2BBdwZz1XWhMOH0UvnARpBfumthjYwcj2id38Mk9eYd7IA%2Fak41VbL8XlU%2BXjQu9Kjo9VClfxyMlUusJo%2FrNGENJm0%2FjLEeus0FeE0C5IaRPjPSHavhBbLW18%2BfK9IMGdEGjne5FABvjlvRFHX2fcKI%2FPQy%2BEW9KrpNEQLrkbpx8YUb2AEEaDRlPbJE%2FQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220604T094354Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYF3AFYDIVTIL2EUR%2F20220604%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c7efe0a27e8a269ac86f9ca0b81ad00766002e3c031c68e407b168e1d659b692' width=800px/><br/>

### Aim of this project
* Target millions of potentials users to use and engage with our app
* Users could be anyone.. who finds a course, video or articles online... likes it and wants to share
* The links they share will also be available in their dashboard for update/delete
* A user could be someone who is a content creator like me... instructors, youtubers, blog and tutorial writers, book authors etc
* Users will signup/signin to our app to post/share/like the links/urls
* Users will do this to get free traffic... to get people's attention... sharing links for free

### Tech Stack
* React and NextJS (React Framework) in the client side.
* API/server using Node Express MongoDB.
* AWS services such as S3 for files storage, SES for sending emails, EC2 for cloud hosting IAM for Identity and access management Route 53 for domain management along with custom rules/policy.
* Mongo Atlas as Managed Database Service in the cloud.

### Install
```
https://github.com/littlelittleJessica/AWS_React_Node.git
```
```
npm install
```


### Get the project running
* Backend
```
npm run start
```
* Frontend
```
npm run dev
```
