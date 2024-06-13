<template>
    <v-container class="mt-5 full-available-height">
      <h2 class="mb-2">Conversation History</h2>
        <v-row class="mb-2 full-available-height">
          <v-col cols="12" class="fill-height">
            <v-card variant="elevated">
              <v-card-text class="expanded-height custom-scroller">
                <div v-for="(item) in conversationHistory" :key="item.id">
                    <div :class="{ 'd-flex flex-row-reverse': item.type=='HumanMessage' }">
                      <v-card variant="outlined" v-if="item['content']['contentType']=='simple_message'" class="pa-4 ma-3 message-chip" :class="item.type=='HumanMessage' ? 'human-message' : 'ai-message'" size="small">
                          {{ item['content']['value'] }}
                        <sub class="ml-2" style="font-size: 0.5rem;">
                          {{ item.createdAt }}
                        </sub>
                      </v-card>
                      <v-card variant="outlined" v-else class="pa-4 ma-3 message-chip" :class="item.type=='HumanMessage' ? 'human-message' : 'ai-message'" size="small">
                        <v-card-text>
                          {{ item.content.value.text_message }} 
                        </v-card-text>
                        <v-card-text>
                          <v-row > 
                          <v-col v-for="(product) in item.content.value.output.records" cols="12" sm="6" md="4" lg="3">
                              <v-card class="mx-auto" max-width="400" rel="noopener">
                                <v-img :src="product.image" aspect-ratio="1"></v-img> 
                                <v-card-title>{{ product.title }}</v-card-title>
                                <div v-if=" typeof product.priceInfo == 'string'">
                                  <v-card-text>Precio: ${{ product.priceInfo}}</v-card-text>
                                </div>
                                <div v-else>
                                  <v-card-text>Precio: ${{ product.priceInfo.price}}</v-card-text>
                                </div>
                                <v-card-actions class="justify-end">
                                  <v-btn rounded="xl" color="#e10098" @click="openLink">
                                      <a :href="product.productUrl" target="_blank" style="text-decoration: none; color: inherit;">Ver detalles</a>
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-col>
                        </v-row>   
                        </v-card-text>  
                        <!-- <v-carousel cycle :hide-delimiters="true" show-arrows-on-hover>
                             <v-carousel-item v-for="(product) in item.content.value.output.records" :key="product.productId">
                              <v-row class="ma-0">
                                <v-col cols="12" sm="6" md="4" lg="3">
                                  <v-card class="mx-auto" max-width="400" rel="noopener">
                                    <v-img :src="product.image" aspect-ratio="1"></v-img> 
                                    <v-card-title>{{ product.title }}</v-card-title>
                                    <v-card-actions class="justify-end">
                                      <v-btn rounded="xl" color="#e10098" @click="openLink">
                                          <a :href="product.productUrl" target="_blank" style="text-decoration: none; color: inherit;">Ver detalles</a>
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </v-carousel-item>
                          </v-carousel> -->
                        <sub class="ml-2" style="font-size: 0.5rem;">
                          {{ item.createdAt }}
                        </sub>
                      </v-card>
                    </div>
                </div>
              </v-card-text>
              <v-card-text >
                <v-row class="mt-1">
                  <v-col cols="12" class="d-flex justify-center">
                    <three-bounce-spinner v-if="loading"></three-bounce-spinner>
                  </v-col>
                </v-row>
                <v-row class="mt-1">
                  <v-col cols="12">
                    <v-text-field
                      v-model="message"
                      label="Escribe un Mensaje"
                      type="text"
                      varient="outlined"
                      @keyup.enter="sendMessage()"
                    >
                  <template v-slot:append>
                    <v-btn variant="tonal" color="primary" style="height: 100%" rounded="lg" @click="sendMessage()">
                      <v-icon>mdi-send</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ThreeBounceSpinner from '@/components/ThreeBounceSpinner.vue'

const conversationHistory =  ref([])
const message = ref("")
const route = useRoute()
const sessionId = route.params.sessionId
const userId = route.query.userId
const visitorId = route.query.visitorId
const userName = route.query.userName

const loading = ref(false);

onMounted(() => {
  loadConversationHistory()
  if(route.query.userQuery !== "") {
    const response = chat(route.query.userQuery).then((response) => {
    addMessageToHistory(response)
  })
  }
})

async function sendMessage() {
  const response = await chat(message.value)
  addMessageToHistory(response)
  message.value = ""
}

function newDate(){
  return new Date(Date.now()).toLocaleString();
}

function addMessageToHistory(response) {
  const humanMessage = parseMessage(response['human_message'])
  const aiMessage = parseMessage(response['ai_message'])
  const conversationHistoryBuffer = conversationHistory.value
  conversationHistoryBuffer.unshift(humanMessage)
  conversationHistoryBuffer.unshift(aiMessage)
  conversationHistory.value = conversationHistoryBuffer
}

function parseMessage(item) {
  const message = {
      'userId': item['user_id'],
      'sessionId': item['session_id'],
      'visitorId': item['visitor_id'],
      'userName': item['user_name'],
      'messageType': item['message_type'],
      'createdAt': item['created_at'],
      'intent': item['intent'],
    }
    message['content'] = {
      'contentType': item['content']['content_type'],
      'value': ''
    }
    if(item['content']['content_type'] === "simple_message"){
      message['content']['value'] = item['content']['value']
    } else {
      message['content']['value'] = JSON.parse(item['content']['value'])
    }
    return message;
}

async function chat(userQuery) {
    try {
      loading.value = true;
      
      const url = `http://localhost:8000/v1/chat`;
      const body = JSON.stringify({ 
          'user_id': route.query.userId,
          'user_name': route.query.userName,
          'visitor_id': route.query.visitorId,
          'session_id' : route.params.sessionId,
          'user_query': userQuery
        });
      // Send Human Message
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });
      const result = await response.json(); // Decode json response
      // Desactivamos el spinner
      loading.value = false;
      return result
    } catch (error) {
      console.error(`Error al enviar el mensaje: ${error}`); 
    }
}

async function loadConversationHistory() {
  const url = `http://localhost:8000/v1/loadHistory?session_id=${sessionId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    const messages = []
    data['conversational_buffer'].forEach(element => {
      const message = parseMessage(element)
      messages.push(message)
    });
    
    conversationHistory.value = [...messages];
  } catch (error) {
    console.error(error)
  };
}

</script>
  
  <style scoped>
    .send-button {
        padding-right: 1em;
        padding-left: 1em;
    }

    .message-chip {
        border-radius:10px;
        height:auto !important;
        white-space: normal !important;
        white-space: pre-line !important; /* Preserve line breaks */
    }

    .human-message {
        /* color: rgb(var(--v-theme-primary)) !important; */
        color: #FAFAFA;
        background-color: #CF3896 !important;
    }

    .ai-message {
        color: #757575 !important;
        
    }

    .expanded-height {
      height: 65vh;
    }

    .carousel-height {
      height: 15vh;
    }

    .custom-scroller {
      overflow: auto;
      display: flex;
      flex-direction: column-reverse;
    }
  </style>