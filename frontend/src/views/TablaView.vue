<template>
    <v-container>
        <v-data-table :headers="headers" :items="vestuarios" sort-by="calories" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Vestuarios</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="550px">
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.nombreCliente"
                                                label="Nombre Cliente"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.telefonoCliente"
                                                label="Teléfono"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.precio" label="Precio"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.medidas" label="Medidas"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.modelo" label="Modelo"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.tipo" label="Tipo"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.descripcion"
                                                label="Descripción"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.fechaEntrega"
                                                label="Fecha Entrega"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.date" label="Fecha de registro"
                                                disabled></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                    Cancelar
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="editarRegistro(editedItem)">
                                    Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">Eliminar</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item._id)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="eliminarRegistro(item._id, item.nombreCliente)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    Reset
                </v-btn>
            </template>
        </v-data-table>
    </v-container>

</template>

<script>

export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'Nombre Cliente', value: 'nombreCliente' },
            { text: 'Teléfono', value: 'telefonoCliente' },
            { text: 'Precio', value: 'precio' },
            { text: 'Medidas', value: 'medidas' },
            { text: 'Modelo', value: 'modelo' },
            { text: 'Tipo', value: 'tipo' },
            { text: 'Descripción', value: 'descripcion' },
            { text: 'Fecha Entrega', value: 'fechaEntrega' },
            { text: 'Fecha de registro', value: 'date' },
            { text: 'Acciones', value: 'actions', sortable: false },
        ],
        vestuarios: [],
        editedIndex: -1,
        editedItem: [],
        defaultItem: {

        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize();
        this.listarRegistros();
    },

    methods: {
        initialize() {

        },

        editItem(item) {
            this.dialog = true;

            console.log(item);

            this.axios.get(`/buscarId/${item}`)
                .then(res => {
                    this.editedItem = res.data
                })
        },

        deleteItem(item) {
            this.editedIndex = this.vestuarios.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.vestuarios.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.vestuarios[this.editedIndex], this.editedItem)
            } else {
                this.vestuarios.push(this.editedItem)
            }
            this.close()
        },

        listarRegistros() {
            this.axios.get('/buscarTodo')
                .then((response) => {
                    this.vestuarios = response.data;
                })
                .catch((e) => {
                    console.log('error' + e)
                })
        },

        editarRegistro(item) {
            this.axios.put(`/actualizarRegistro/${item._id}`, item)
                .then(res => {

                    const index = this.vestuarios.findIndex(n => n._id === res.data._id);

                    this.vestuarios[index].nombreCliente = res.data.nombreCliente;
                    this.vestuarios[index].telefonoCliente = res.data.telefonoCliente;
                    this.vestuarios[index].precio = res.data.precio;
                    this.vestuarios[index].medidas = res.data.medidas;
                    this.vestuarios[index].modelo = res.data.modelo;
                    this.vestuarios[index].tipo = res.data.tipo;
                    this.vestuarios[index].descripcion = res.data.descripcion;
                    this.vestuarios[index].fechaEntrega = res.data.fechaEntrega;

                    this.$swal('Editado!',
                        'Registro editado con éxito!',
                        'success');

                    this.close()

                }).catch(e => {
                    console.log(e.response)
                })
        },

        eliminarRegistro(id, nombreCli) {
            console.log(id)
            this.$swal.fire({
                title: `¿Estás seguro que quieres eliminar a ${nombreCli}?`,
                text: "No se podrá revertir",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal.fire({
                        title: "Eliminado!",
                        text: `El registro con nombre: ${nombreCli}, ha sido eliminado`,
                        icon: "success"
                    });

                    this.axios.delete(`/deletePorId/${id}`)
                        .then(res => {
                            const index = this.vestuarios.findIndex(item => item._id === res.data._id);
                            this.vestuarios.splice(index, 1);
                            this.editedIndex = this.vestuarios.indexOf(item);
                            this.editedItem = Object.assign({}, item);

                        }).catch(e => {
                            console.log(e.response)
                        })
                }
            });


        }
    },
}
</script>