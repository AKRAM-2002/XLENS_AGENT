# {{crew_name}} Crew

Welcome to the {{crew_name}} Crew project, powered by [crewAI](https://crewai.com). This template is designed to help you set up a multi-agent AI system with ease, leveraging the powerful and flexible framework provided by crewAI. Our goal is to enable your agents to collaborate effectively on complex tasks, maximizing their collective intelligence and capabilities.

## Installation

Ensure you have Python >=3.10 <=3.13 installed on your system. This project uses [Poetry](https://python-poetry.org/) for dependency management and package handling, offering a seamless setup and execution experience.

First, if you haven't already, install Poetry:

```bash
pip install poetry
```

Next, navigate to your project directory and install the dependencies:

```bash
poetry install
```

### Customizing

- Modify `src/{{folder_name}}/agents.py`
- Modify `src/{{folder_name}}/tasks.py`

## Running the Project

To kickstart your crew of AI agents and begin task execution:

```bash
poetry run python run.py
```

This command initializes the {{name}} Crew, assembling the agents and assigning them tasks as defined in your configuration.

## Understanding Your Crew

The {{name}} Crew is composed of multiple AI agents, each with unique roles, goals, and tools. These agents collaborate on a series of tasks, defined in `tasks.py`, leveraging their collective skills to achieve complex objectives. The `agents.py` file outlines the capabilities and configurations of each agent in your crew.

## Support

For support, questions, or feedback regarding the {{crew_name}} Crew or crewAI, visit our [documentation](https://docs.crewai.com), reach out to us through our [GitHub repository](https://github.com/joaomdmoura/crewai) or [chat wtih our docs](https://chatg.pt/DWjSBZn)

Let's create wonders together with the power and simplicity of crewAI.