import React from 'react';
import {observer} from "mobx-react";
import * as d3 from 'd3';

/**
 * 实体抽取
 */
@observer
export default class EntityExtract extends React.Component {
	componentDidMount(props) {
		var width = 890,
			height = 300;
		var a = {"机构名":[{"中国软件行业协会":1.0},{"北京英富森软件股份有限公司":1.0}],"地名":[{"中国":3.0}]}
		var root = {
			"name": "server1900",
			"children": [{
				"name": "server913",
				"_children": null,
				"children": [{
					"name": "server948"
				}, {
					"name": "server946"
				}]
			}, {
				"name": "server912",
				"_children": null,
				"children": [{
					"name": "server984"
				}, {
					"name": "server983"
				}]
			}, {
				"name": "server911",
				"_children": null,
				"children": [{
					"name": "server999",
					"_children": null,
					"children": [{
						"name": "server992"
					}]
				}]
			}]
		};

		root = d3.hierarchy(root);

		var i = 0;

		var transform = d3.zoomIdentity;;

		var nodeSvg, linkSvg, simulation, nodeEnter, linkEnter ;

		var svg = d3.select("#graph").append("svg")
			.attr("width", width)
			.attr("height", height)
			// .call(d3.zoom().scaleExtent([1 / 2, 8]).on("zoom", zoomed))
			.append("g")
			.attr("transform", "translate(40,0)");

		function zoomed() {
			svg.attr("transform", d3.event.transform);
		}

		simulation = d3.forceSimulation()
			.force("link", d3.forceLink().id(function(d) { return d.id; }))
			.force("charge", d3.forceManyBody())
			.force("center", d3.forceCenter(width / 2, height / 2))
			.on("tick", ticked);

		update();

		function update() {
			var nodes = flatten(root);
			var links = root.links();

			simulation
				.nodes(nodes)

			simulation.force("link")
				.links(links);

			linkSvg = svg.selectAll(".link")
				.data(links, function(d) { return d.target.id; })

			linkSvg.exit().remove();

			linkSvg = linkSvg.enter()
				.append("line")
				.attr("class", "link");

			nodeSvg = svg.selectAll(".node")
				.data(nodes, function(d) { return d.id; })

			nodeSvg.exit().remove();

			nodeSvg = nodeSvg.enter()
				.append("g")
				.attr("class", "node")


			nodeSvg.append("circle")
				.attr("r", 4  )
				.append("title")
				.text(function(d) { return d.data.name; })

			nodeSvg.append("text")
				.attr("dy", 3)
				.attr("x", function(d) { return d.children ? -8 : 8; })
				.style("text-anchor", function(d) { return d.children ? "end" : "start"; })
				.text(function(d) { return d.data.name; });



		}

		function ticked() {
			linkSvg
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });

			nodeSvg
				.attr("transform", function(d) { return "translate(" + d.x + ", " + d.y + ")"; });
		}

		function flatten (root) {
			// hierarchical data to flat data for force layout
			var nodes = [];
			function recurse(node) {
				if (node.children) node.children.forEach(recurse);
				if (!node.id) node.id = ++i;
				else ++i;
				nodes.push(node);
			}
			recurse(root);
			return nodes;
		}
	}

	render() {
		let {item} = this.props;
		return (
			<div className="m-hk">
				<div className="jpt cf">
					<h3 className="fl"><i>{item.title}</i></h3>
				</div>
				<div className="jfp" id="graph">
				</div>
			</div>
		)
	}
}
