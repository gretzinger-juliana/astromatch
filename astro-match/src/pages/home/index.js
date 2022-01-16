import react from 'react'

import {
    PageContainer,
    UsuarioContainer,
    ImagemUsuario,
    NomeUsuario,
    DescricaoUsuario,
    ChooseButton
} from './styles'

import imagem from '../img/img-profile.jpg'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../constants/baseUrl'

const HomePage = () => {
    const [profile, setProfile] = useState({})


    const getProfile = () => {
        const URL =`${BASE_URL}/person`

    axios.get(URL)
        .then((res) => {
            setProfile(res.data.profile)
        })
        .catch((err) => {
            console.log(err.response)
            
        })
    }  



    const choosePerson = (boolean) => {
        const URL = `${BASE_URL}/choose-person`
        const body = {
            "id": profile.id,
            "choice": boolean
        }

        axios.post(URL, body)
            .then((res) => {

                getProfile()

            })
            
            .catch((err) => {

                console.log(err.response)

            })
    }

    useEffect(() => {
        getProfile()
    }, [])
    
 

   return (

    <PageContainer>

        <UsuarioContainer>

            <ImagemUsuario src={profile.photo}/>

                <NomeUsuario>{profile.name}, {profile.age}</NomeUsuario>
                <DescricaoUsuario>{profile.bio}</DescricaoUsuario>

            
            <div>
                <ChooseButton onClick={() => choosePerson(false)}>X</ChooseButton>
                <ChooseButton onClick={() =>choosePerson(true)}>❤</ChooseButton>
            </div>


        </UsuarioContainer>

    </PageContainer>

   ) 

   
   }

export default HomePage



