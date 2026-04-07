# graph.py
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from .state import AgentState   # Notice the relative import
from .tools import tools        # Notice the relative import

llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro", temperature=0)
llm_with_tools = llm.bind_tools(tools)

def call_model(state: AgentState):
    response = llm_with_tools.invoke(state["messages"])
    return {"messages": [response]}

def should_continue(state: AgentState) -> str:
    last_message = state["messages"][-1]
    if last_message.tool_calls:
        return "continue"
    return "end"

workflow = StateGraph(AgentState)
workflow.add_node("agent", call_model)
workflow.add_node("action", ToolNode(tools))
workflow.set_entry_point("agent")
workflow.add_conditional_edges("agent", should_continue, {"continue": "action", "end": END})
workflow.add_edge("action", "agent")

# Export the compiled app so other files can use it
app = workflow.compile()
