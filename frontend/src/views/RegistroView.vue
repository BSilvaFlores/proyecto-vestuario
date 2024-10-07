<template>
    <v-container>
        <v-form @submit.prevent="agregarRegistro()">
            <v-text-field v-model="atributos.nombreCliente" :counter="30" label="Nombre Cliente"
                required></v-text-field>

            <v-text-field v-model="atributos.telefonoCliente" label="Teléfono" required></v-text-field>

            <v-text-field v-model="atributos.precio" label="Precio" required></v-text-field>

            <v-text-field v-model="atributos.fechaEntrega" label="Fecha de entrega" required></v-text-field>

            <v-text-field v-model="atributos.medidas" label="Medidas" required></v-text-field>

            <v-text-field v-model="atributos.modelo" label="Modelo" required></v-text-field>

            <v-select v-model="atributos.tipo" :items="tipoOpciones" label="Tipo"></v-select>

            <v-text-field v-model="atributos.descripcion" label="Descripcion" required></v-text-field>


            <v-btn color="success" class="mr-4" type="submit">
                Agregar Registro
            </v-btn>

            <v-btn color="error" class="mr-4" @click="limpiarFormulario()">
                Limpiar
            </v-btn>
        </v-form>
    </v-container>

</template>

<script>
export default {
    data() {
        return {
            atributosArreglo: [],

            atributos: {
                nombreCliente: "",
                telefonoCliente: "",
                precio: "",
                fechaEntrega: "",
                medidas: "",
                modelo: "",
                tipo: "",
                descripcion: ""
            },

            tipoOpciones: ['Tradicional', 'Medio', 'Premium']
        }
    },
    methods: {
        agregarRegistro() {
            if (!this.atributos.nombreCliente) {
                console.log(this.atributos);
                this.$swal('Error!',
                    'Falta Nombre!',
                    'error');
            } else if (!this.atributos.telefonoCliente) {
                this.$swal('Error!',
                    'Falta teléfono!',
                    'error');
            } else if (!this.atributos.precio) {
                this.$swal('Error!',
                    'Falta precio!',
                    'error');
            } else if (!this.atributos.fechaEntrega) {
                this.$swal('Error!',
                    'Falta fecha de entrega!',
                    'error');
            } else if (!this.atributos.medidas) {
                this.$swal('Error!',
                    'Falta medidas!',
                    'error');
            } else if (!this.atributos.modelo) {
                this.$swal('Error!',
                    'Falta modelo!',
                    'error');
            } else if (!this.atributos.tipo) {
                this.$swal('Error!',
                    'Falta tipo!',
                    'error');
            } else if (!this.atributos.descripcion) {
                this.$swal('Error!',
                    'Falta descripcion!',
                    'error');
            }

            else {
                this.axios
                    .post("/nuevo-registro", this.atributos)
                    .then((res) => {
                        this.atributosArreglo.push(res.data);
                        this.$swal('Agregado!',
                            'Registro agregado con éxito!',
                            'success');

                        this.limpiarFormulario();
                    })
                    .catch((e) => {
                        console.log(e.response)
                        alert('Error al guardar registro');
                    })
            }
        },
        limpiarFormulario() {
            this.atributos.nombreCliente = "";
            this.atributos.telefonoCliente = "";
            this.atributos.precio = "";
            this.atributos.fechaEntrega = "";
            this.atributos.medidas = "";
            this.atributos.modelo = "";
            this.atributos.tipo = "";
            this.atributos.descripcion = "";
        }
    }
}

</script>