import {Component, OnInit} from '@angular/core';
import {GithubService} from "../github.service";
import {Githubrepo} from "../interfaces/githubrepo";
import * as d3 from 'd3';

@Component({
  selector: 'app-bargraph',
  templateUrl: './bargraph.component.html',
  styleUrls: ['./bargraph.component.scss']
})
export class BargraphComponent implements OnInit {
  private data: Githubrepo[] = [];
  private svg:any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private gitHubService: GithubService) {
    this.gitHubService.getData().subscribe(d => {
      this.data = d;
      this.createSvg();
      this.drawBars();
    });
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(this.data.map(d => d.repo_name))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, Math.max(...this.data.map(x=> x.size))+100])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("x", (d:any) => x(d.repo_name))
      .attr("y", (d:any) => y(d.size))
      .attr("width", x.bandwidth())
      .attr("height", (d:any) => this.height - y(d.size))
      .attr("fill", "#d04a35");
  }

  ngOnInit(): void {
  }

}
