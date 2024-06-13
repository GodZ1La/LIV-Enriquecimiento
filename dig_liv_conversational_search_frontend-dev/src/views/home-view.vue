<template>
  <v-container>
    <v-card variant="flat" class="mt-5 mb-5">
      <v-card-text class="pb-2">
        <div class="hero">¡Hola {{userName}}! 👋 </div>
        <div class="hero">¿Cómo puedo ayudarte?</div>
        <div class="hero-sub mb-0 pb-0">Estas son algunas recomendaciones para iniciar la conversación </div>
        <v-card variant="flat" class="mt-5">
      </v-card>
      </v-card-text>
      <v-card-text>
          <v-row>
            <v-col cols="6" md="3" v-for="(suggestion, index) in suggestions" :key="index">
              <v-card variant="outlined" class="suggestion-card" @click="suggestionClick(suggestion)">
                <v-card-text class="mb-2 mt-2">
                  <div><span class="highlight-card-text">"{{suggestion.highlighted_text}}</span>{{ suggestion.normal_text }}"</div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card variant="elevated" class="chat-action-card">
                <v-card-text class="mt-2">
                  Escribe al chat
                  <v-text-field class="pt-2"
                    label="Recibe recomendaciones en breve"
                    v-model="userQuery"
                    @keyup.enter="createOrRetrieveSession"
                  >
                  <template v-slot:append>
                    <v-btn variant="tonal" color="primary" style="height: 100%" rounded="lg" @click="createOrRetrieveSession">
                      <v-icon>mdi-send</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
                </v-card-text>
              </v-card>
              <v-card variant="outlined" class="mt-10">
                <v-card-text class="mt-2">
                  <v-icon icon="mdi-security" class="mr-1" /> Tus conversaciones son revisadas continuamente para mejorar la experiencia de búsqueda. No compartas nada que no quieras que sea revisado o utilizado.
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-card-text class="pa-0 mt-10" v-show="false">
            <v-expansion-panels>
              <v-expansion-panel title="Datos del usuario ">
                <v-expansion-panel-text>
                  <v-form>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field label="Nombre" v-model="userName" required></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field label="Visitor ID" v-model="visitorId" required></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field label="User ID" v-model="userId" required></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-expansion-panel-text>  
              </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter()

const suggestions = [
  { highlighted_text: "Encuentra blusas azules ", normal_text: "para niña talla M", full_text: "Encuentra blusas azules para niña talla M"},
  { highlighted_text: "Recomiéndame regalos ", normal_text: "para un cumpleaños", full_text: "Recomiéndame regalos para un cumpleaños"},
  { highlighted_text: "Cuáles son los productos ", normal_text: "con más promociones?", full_text: "Cuáles son los productos con más promociones?"},
  { highlighted_text: "Muéstrame sugerencias ", normal_text: "de artículos más vendidos", full_text: "Muéstrame sugerencias de artículos más vendidos"}
]

const userQuery = ref('')

const userName = ref('Paula')
const visitorId = ref('123456')
const userId = ref('123456')

async function createOrRetrieveSession() {
  if(userQuery.value != '') {
    
    const url = `http://localhost:8000/v1/conversationalSession`;
    const body = JSON.stringify({ 
      'user_id': userId.value
    });
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });

      const data = await response.json(); // Decodifica la respuesta JSON
      console.log(data)
      loadConversationalSession(data.session_id)

    } catch (error) {
      console.error(`Error al iniciar sesión: ${error}`);
    }
  }
}

function suggestionClick(suggestion) {
  userQuery.value = suggestion.full_text
  createOrRetrieveSession()
}


function loadConversationalSession(id) {
  router.push(`/conversation/${id}?userId=${userId.value}&userName=${userName.value}&visitorId=${visitorId.value}&userQuery=${userQuery.value}`)
}

</script>

<style scoped>
  .hero {
    font-size: 30pt;
    margin-top: 20px;
    margin-bottom: 20px;
    color: #36454F;
  }

  .hero-sub {
    font-size: 14pt;
    font-weight: bold;
    color: #71797E;
  }

  .highlight-card-text {
    font-weight: bold;
  }

  .suggestion-card {
    border-color: #E5E4E2;
  }

  .chat-action-card {
    border-color: #E5E4E2;
  }

  .suggestion-card-instruction {
    height: 100px;
  }

  .suggestion-card-action {
    color: #7a7a7a;
  }

  .suggestion-card-action span {
    color: #4285F4;
    font-weight: bold;
  }

  @media (max-width: 400px) {
    .suggestion-card-instruction {
      height: 90px;
    }

    .suggestion-card-action {
      height: 50px;
    }
  }

  @media (min-width) and (max-width: 600px) {
    .suggestion-card-instruction {
      height: 70px;
    }

    .suggestion-card-action {
      height: 50px;
    }
  }

  @media (min-width: 600px) and (max-width: 960px) {
    .suggestion-card-instruction {
      height: 50px;
    }

    .suggestion-card-action {
      height: 30px;
    }
  }

  @media (min-width: 960px) and (max-width: 1280px) {
    .suggestion-card-instruction {
      height: 110px;
    }

    .suggestion-card-action {
      height: 60px;
    }
  }

  @media (min-width: 1280px) and (max-width: 1904px) {
    .suggestion-card-instruction {
      height: 75px;
    }

    .suggestion-card-action {
      height: 40px;
    }
  }

  @media (min-width: 1904px){
    .suggestion-card-instruction {
      height: 60px;
    }

    .suggestion-card-action {
      height: 35px;
    }
  }
</style>