import json
import os
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage
from graph import app

# Load the API key from the .env file
load_dotenv()

if __name__ == "__main__":
    print("🤖 Starting the NYC Atlas Researcher Agent...")

    # We explicitly tell it to format the output as JSON
    system_prompt = """
    You are an expert GIS researcher. Find 3 highly specific, interactive web maps related of New York City (NYC).
    The maps may relate to the following topics:
          * Boundaries
          * Demographics
          * Dining
          * Elections
          * Employment
          * Health
          * History
          * Housing
          * Land Use
          * Nature and Parks
          * Permits
          * Planning
          * Politics
          * Population
          * Property
          * Public Assistance
          * Public Information
          * Race and Ethnicity
          * Resiliency and Climate
          * Safety
          * Tourism
          * Transportation
          * Utilities
          * Waste
          * Water
    Use your search and scrape tools to verify the information.

    CRITICAL: Your final response must be ONLY a raw JSON array. Do not include markdown formatting like ```json.
    Each object in the array must have the following keys:
    "title" (string), "url" (string), "author" (string), "description" (string), "themes" (an array of multiple string tags from the bulleted list above)

    If available, please include the following keys:
    "publication_date" (date), "data_sources" (string of comma separated values), and "last_updated" (date).
    """

    inputs = {"messages": [HumanMessage(content=system_prompt)]}

    # Stream the graph execution
    final_response = ""
    for output in app.stream(inputs, stream_mode="values"):
        last_message = output["messages"][-1]
        print(f"Agent is thinking/acting... (Message type: {type(last_message).__name__})")
        final_response = last_message.content

    # Save the output to a file
    output_path = os.path.join(os.path.dirname(__file__), "output", "raw_maps_data.json")

    try:
        # Verify it's valid JSON before saving
        parsed_json = json.loads(final_response)
        with open(output_path, "w") as f:
            json.dump(parsed_json, f, indent=4)
        print(f"\n✅ Success! Data saved to {output_path}")
    except json.JSONDecodeError:
        print("\n⚠️ The agent did not return perfectly formatted JSON. Here is the raw output:")
        print(final_response)
