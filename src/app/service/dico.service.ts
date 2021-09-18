import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Word } from '../models/word';

@Injectable()
export class DicoService {

    status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

    productNames: string[] = [
        "Bamboo Watch", 
        "Black Watch", 
        "Blue Band", 
        "Blue T-Shirt", 
        "Bracelet", 
        "Brown Purse", 
        "Chakra Bracelet",
        "Galaxy Earrings",
        "Game Controller",
    ];

    constructor(private http: HttpClient) { }

    getWords() {
        return this.http.get<any>('assets/dictionary.json')
        .toPromise()
        .then(res => <Word[]>res.data)
        .then(data => { return data; });
    }

    generateWord(): Word {
        return  {
            category: this.generateName(),
            expression: this.generateName(),
            translation: this.generateStatus(),
            rating: this.generateRating()
        };
    }

    generateName() {
        return this.productNames[Math.floor(Math.random() * Math.floor(9))];
    }

    generateStatus() {
        return this.status[Math.floor(Math.random() * Math.floor(3))];
    }

    generateRating() {
        return Math.floor(Math.random() * Math.floor(5)+1);
    }
}